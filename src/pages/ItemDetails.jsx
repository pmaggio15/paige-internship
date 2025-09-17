import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
        );
        
        if (Array.isArray(response.data)) {
          const foundItem = response.data.find(item => item.id === parseInt(id));
          
          if (foundItem) {
            setItem(foundItem);
            setError(null);
          } else {
            setError('Item not found');
          }
        }
      } catch (error) {
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton skeleton-image-large"></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton skeleton-title-large"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2>Error</h2>
                  <p>{error}</p>
                  <Link to="/" className="btn btn-primary">Go Home</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2>Item not found</h2>
                  <Link to="/" className="btn btn-primary">Go Home</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title || "NFT"}
                  onError={(e) => {
                    e.target.src = nftImage;
                  }}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title || "Rainbow Style #194"}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views || 324}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 99}
                    </div>
                  </div>

                  <p>
                    {item.description || 
                    "illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                  </p>

                  <div className="owner-section">
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.ownerId || item.authorId || '1'}`}>
                          <img 
                            className="lazy" 
                            src={item.ownerImage || item.authorImage || AuthorImage} 
                            alt=""
                            onError={(e) => {
                              e.target.src = AuthorImage;
                            }}
                          />
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.ownerId || item.authorId || '1'}`}>
                          {item.owner || item.author || "Nicholas Daniels"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="creator-section">
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.creatorId || item.authorId || '1'}`}>
                          <img 
                            className="lazy" 
                            src={item.creatorImage || item.authorImage || AuthorImage} 
                            alt=""
                            onError={(e) => {
                              e.target.src = AuthorImage;
                            }}
                          />
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.creatorId || item.authorId || '1'}`}>
                          {item.creator || item.author || "Franklin Greer"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="price-section">
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price || "0.17"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;