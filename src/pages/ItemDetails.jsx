import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import ItemDetailsSkeleton from "../components/UI/ItemDetailsSkeleton";

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
        setError(null);
        
        let response;
        try {
          response = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
          );
        } catch (error) {
          response = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?id=${id}`
          );
        }
        
        console.log("ItemDetails API response:", response.data);
        
        if (response.data) {
          setItem(response.data);
        } else {
          throw new Error('No data returned from itemDetails API');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
        
        try {
          const fallbackResponse = await axios.get(
            'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
          );
          
          if (Array.isArray(fallbackResponse.data)) {
            const foundItem = fallbackResponse.data.find(item => 
              item.id === parseInt(id) || item.nftId === parseInt(id)
            );
            
            if (foundItem) {
              setItem(foundItem);
              setError(null);
            } else {
              setError('Item not found');
            }
          } else {
            setError('Item not found');
          }
        } catch (fallbackError) {
          console.error('Fallback failed:', fallbackError);
          setError('Failed to load item details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const expiry = new Date(expiryDate).getTime();
        const difference = expiry - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          if (days > 0) {
            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
          } else {
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
          }
        } else {
          setTimeLeft('Expired');
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, [expiryDate]);

    return timeLeft;
  };

  if (loading) {
    return <ItemDetailsSkeleton />;
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
                  {item.expiryDate && (
                    <div className="de_countdown" style={{ marginBottom: '20px' }}>
                      <CountdownTimer expiryDate={item.expiryDate} />
                    </div>
                  )}

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
                          {item.ownerName || item.authorName || item.owner || item.author || "Nicholas Daniels"}
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
                          {item.creatorName || item.authorName || item.creator || item.author || "Franklin Greer"}
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
