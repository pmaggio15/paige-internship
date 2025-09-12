import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 30,
      },
      loop: true,
      mode: "free-snap",
      duration: 800,
      easing: "ease-out",
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      breakpoints: {
        "(max-width: 576px)": {
          slides: {
            perView: 1,
            spacing: 10,
          },
          duration: 600,
          mode: "snap",
        },
        "(min-width: 577px) and (max-width: 768px)": {
          slides: {
            perView: 2,
            spacing: 15,
          },
          duration: 700,
          mode: "snap",
        },
        "(min-width: 769px) and (max-width: 1024px)": {
          slides: {
            perView: 3,
            spacing: 20,
          },
          duration: 750,
          mode: "free-snap",
        },
        "(min-width: 1025px)": {
          slides: {
            perView: 4,
            spacing: 30,
          },
          duration: 800,
          mode: "free-snap",
        },
      },
    }
  );

  useEffect(() => {
    let isMounted = true;
    
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
        );
        if (isMounted && Array.isArray(response.data)) {
          setItems(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNewItems();

    return () => {
      isMounted = false;
    };
  }, []);


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

    return <div className="de_countdown">{timeLeft}</div>;
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="navigation-wrapper">
                <div className="keen-slider skeleton-slider">
                  {new Array(4).fill(0).map((_, index) => (
                    <div key={index} className="keen-slider__slide">
                      <div className="nft__item skeleton-card">
                        <div className="author_list_pp">
                          <div className="skeleton skeleton-avatar"></div>
                        </div>
                        <div className="skeleton skeleton-countdown"></div>
                        <div className="nft__item_wrap skeleton-item">
                          <div className="skeleton skeleton-image"></div>
                        </div>
                        <div className="nft__item_info skeleton-item">
                          <div className="skeleton skeleton-title"></div>
                          <div className="skeleton skeleton-price"></div>
                          <div className="skeleton skeleton-likes"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="arrow arrow--left skeleton-arrow">
                  <div className="skeleton skeleton-arrow-icon"></div>
                </div>
                <div className="arrow arrow--right skeleton-arrow">
                  <div className="skeleton skeleton-arrow-icon"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const itemsToShow = items;

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {itemsToShow.map((item, index) => (
                  <div key={item.id || index} className="keen-slider__slide">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId || '1'}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.author || 'Unknown Creator'}`}
                        >
                          <img 
                            className="lazy" 
                            src={item.authorImage || AuthorImage} 
                            alt={item.author || 'Creator'}
                            onError={(e) => {
                              e.target.src = AuthorImage;
                            }}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {item.expiryDate && (
                        <CountdownTimer expiryDate={item.expiryDate} />
                      )}

                      <div className="nft__item_wrap">
                        <Link to={`/item-details/${item.id || '1'}`}>
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
                        <Link to={`/item-details/${item.id || '1'}`}>
                          <h4>{item.title || "Unnamed Item"}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {item.price || '0.00'} ETH
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
              {loaded && instanceRef.current && (
                <>
                  <button
                    className="arrow arrow--left"
                    onClick={(e) => {
                      e.stopPropagation();
                      instanceRef.current?.prev();
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7.5 9C7.5 9 4.5 6.41421 4.5 6C4.5 5.58579 7.5 3 7.5 3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="arrow arrow--right"
                    onClick={(e) => {
                      e.stopPropagation();
                      instanceRef.current?.next();
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.5 3C4.5 3 7.5 5.58579 7.5 6C7.5 6.41421 4.5 9 4.5 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;