import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ items, authorId, authorName }) => {

  if (items === undefined) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div style={{ padding: '60px 20px' }}>
                <p>Loading items...</p>
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
                <Link to="/" className="btn btn-primary">Explore Items</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => (
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
                          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/item-details/${item.id}`} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a 
                          href={`https://twitter.com/intent/tweet?url=${window.location.origin}/item-details/${item.id}&text=Check out this NFT: ${item.title}`} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href={`mailto:?subject=Check out this NFT&body=Check out this NFT: ${window.location.origin}/item-details/${item.id}`}>
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.id}`}>
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
                  <Link to={`/item-details/${item.id}`}>
                    <h4>{item.title || "Untitled NFT"}</h4>
                  </Link>
                  <div className="nft__item_price">
                    {item.price || "0.00"} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;