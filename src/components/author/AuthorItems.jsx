import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NFTItemsSkeleton from "../UI/NFTItemsSkeleton";

const AuthorItems = ({ authorId, authorName, loading: parentLoading }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      if (!authorId || parentLoading) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const apiEndpoints = [
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems',
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections',
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
        ];

        const responses = await Promise.allSettled(
          apiEndpoints.map(url => fetch(url))
        );

        let allAuthorItems = [];

        for (let i = 0; i < responses.length; i++) {
          const response = responses[i];
          if (response.status === 'fulfilled' && response.value.ok) {
            const data = await response.value.json();
            
            const authorItems = data.filter(item => 
              item.authorId === authorId
            ).map(item => {
              const apiName = apiEndpoints[i].split('/').pop(); 
              return {
                ...item,
                id: `${apiName}-${item.id}`,
                source: apiName,
                nftImage: item.nftImage || item.authorImage,
                title: item.title || item.authorName || `NFT by ${authorName}`,
                price: item.price || (item.code ? item.code / 100 : null)
              };
            });
            
            allAuthorItems = [...allAuthorItems, ...authorItems];
          }
        }
        setItems(allAuthorItems);

      } catch (err) {
        console.error('Error fetching author items:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [authorId, parentLoading]);

  console.log("AuthorItems received:", { items, authorId, authorName });
  
  if (parentLoading) {
    return null;
  }
  
  if (loading) {
    return <NFTItemsSkeleton itemCount={4} />;
  }

  if (error) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div style={{ padding: '60px 20px' }}>
                <h4>Error loading items</h4>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="no-items" style={{ padding: '60px 20px' }}>
                <h4>No items found</h4>
                <p>This author hasn't created any items yet.</p>
                <Link to="/" className="btn-main">Explore Items</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleItemClick = (item) => {
    console.log("Item clicked:", item);
  };

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => {
            console.log("Rendering item:", item); 
            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId || authorId}`}>
                      <img 
                        className="lazy" 
                        src={item.authorImage || AuthorImage} 
                        alt={authorName || 'Author'}
                        onError={(e) => {
                          e.target.src = AuthorImage;
                        }}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/item-details/${item.nftId || item.id}`} 
                            target="_blank" 
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a 
                            href={`https://twitter.com/intent/tweet?url=${window.location.origin}/item-details/${item.nftId || item.id}&text=Check out this NFT: ${item.title}`} 
                            target="_blank" 
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href={`mailto:?subject=Check out this NFT&body=Check out this NFT: ${window.location.origin}/item-details/${item.nftId || item.id}`}>
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/item-details/${item.nftId || item.id}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title || 'NFT'}
                        onError={(e) => {
                          e.target.src = nftImage;
                        }}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link 
                      to={`/item-details/${item.nftId || item.id}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <h4>{item.title || "Untitled NFT"}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {item.price ? `${item.price} ETH` : 
                       item.code ? `${(item.code / 100).toFixed(2)} ETH` : '0.00 ETH'}
                    </div>
                    {(item.likes !== undefined || item.source === 'newItems') && (
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes || item.code || 0}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;