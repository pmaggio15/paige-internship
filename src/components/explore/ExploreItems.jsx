import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ExploreSkeleton from "../UI/ExploreSkeleton";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOption, setSortOption] = useState("");

  
  useEffect(() => {
    const fetchNfts = async () => {
      try {
        setLoading(true);
        
        
        let apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        if (sortOption) {
          const filterMap = {
            "price_low_to_high": "price_low_to_high",
            "price_high_to_low": "price_high_to_low", 
            "likes_high_to_low": "likes_high_to_low"
          };
          const filterValue = filterMap[sortOption];
          if (filterValue) {
            apiUrl += `?filter=${filterValue}`;
          }
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch NFTs");
        }
        const data = await response.json();
        setNfts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [sortOption]); 

  
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

 
  const sortedNfts = [...nfts]; 

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };


  if (loading) {
    return <ExploreSkeleton itemCount={8} />;
  }

  if (error) {
    return (
      <>
        <div>
          <select id="filter-items" defaultValue="" disabled>
            <option value="">Error loading data</option>
          </select>
        </div>
        <div className="col-md-12 text-center" style={{ padding: "50px" }}>
          <h4>Error loading NFTs: {error}</h4>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-main lead"
            style={{ marginTop: "20px" }}
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <select 
          id="filter-items" 
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      
      {sortedNfts.slice(0, visibleCount).map((nft) => (
        <div
          key={nft.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${nft.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Author ID: ${nft.authorId}`}
              >
                <img 
                  className="lazy" 
                  src={nft.authorImage} 
                  alt={`Author ${nft.authorId}`}
                  onError={(e) => {
                    e.target.src = AuthorImage;
                  }}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            
            {nft.expiryDate && (
              <CountdownTimer expiryDate={nft.expiryDate} />
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a 
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/item-details/' + nft.nftId)}&quote=${encodeURIComponent('Check out this NFT: ' + nft.title)}`}
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/item-details/' + nft.nftId)}&text=${encodeURIComponent('Check out this amazing NFT: ' + nft.title + ' for ' + nft.price + ' ETH!')}`}
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a 
                      href={`mailto:?subject=${encodeURIComponent('Check out this NFT: ' + nft.title)}&body=${encodeURIComponent('I found this amazing NFT: ' + nft.title + ' for ' + nft.price + ' ETH. Check it out: ' + window.location.origin + '/item-details/' + nft.nftId)}`}
                    >
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${nft.nftId}`}>
                <img 
                  src={nft.nftImage} 
                  className="lazy nft__item_preview" 
                  alt={nft.title}
                  onError={(e) => {
                    e.target.src = nftImage; 
                  }}
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{nft.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {visibleCount < sortedNfts.length && (
        <div className="col-md-12 text-center">
          <Link 
            to="#" 
            id="loadmore" 
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              handleLoadMore();
            }}
          >
            Load more
          </Link>
        </div>
      )}
      

    </>
  );
};

export default ExploreItems;