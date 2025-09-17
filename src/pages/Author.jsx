import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import CompleteAuthorSkeleton from "../components/UI/CompleteAuthorSkeleton";

const Author = () => {
  const { id } = useParams(); 
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const generateFollowerCount = (authorId) => {
    const seed = parseInt(authorId) || 1;
    return Math.floor((seed * 7) % 5000) + 100;
  };

  const generateWalletAddress = (authorId) => {
    const seed = parseInt(authorId) || 1;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 57; i++) {
      result += chars.charAt((seed * (i + 1)) % chars.length);
    }
    return result;
  };
  
  const copyToClipboard = () => {
    const walletAddress = generateWalletAddress(parseInt(id));
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert('Wallet address copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy wallet address');
    });
  };

  
  useEffect(() => {
    const followedAuthors = JSON.parse(localStorage.getItem('followedAuthors') || '[]');
    const isAlreadyFollowing = followedAuthors.includes(id);
    setIsFollowing(isAlreadyFollowing);
    
  
    const baseCount = generateFollowerCount(parseInt(id));
    setFollowerCount(baseCount);
  }, [id]);


  const handleFollowToggle = () => {
    const followedAuthors = JSON.parse(localStorage.getItem('followedAuthors') || '[]');
    
    if (isFollowing) {
     
      const updatedAuthors = followedAuthors.filter(authorId => authorId !== id);
      localStorage.setItem('followedAuthors', JSON.stringify(updatedAuthors));
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
  
      const updatedAuthors = [...followedAuthors, id];
      localStorage.setItem('followedAuthors', JSON.stringify(updatedAuthors));
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const topSellersData = await response.json();
        
        const foundAuthor = topSellersData.find(
          (seller) => seller.authorId.toString() === id.toString()
        );
        
        if (!foundAuthor) {
          throw new Error("Author not found");
        }
        
        setAuthor(foundAuthor);
        
      } catch (err) {
        setError(err.message);
        console.error("Error fetching author data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthorData();
    }
  }, [id]);

  if (loading) {
    return <CompleteAuthorSkeleton itemCount={4} />;
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2>Error</h2>
                  <p>Author with ID {id} not found</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="btn-main"
                    style={{ marginRight: '10px' }}
                  >
                    Retry
                  </button>
                  <Link to="/" className="btn-main">Go Home</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  const authorName = author?.authorName || "Unknown Author";
  const authorUsername = authorName.toLowerCase().replace(/\s+/g, '');
  const walletAddress = generateWalletAddress(parseInt(id));

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img 
                        src={author?.authorImage || AuthorImage} 
                        alt={authorName}
                        onError={(e) => {
                          e.target.src = AuthorImage;
                        }}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">@{authorUsername}</span>
                          <span id="wallet" className="profile_wallet">
                            {walletAddress}
                          </span>
                          <button 
                            id="btn_copy" 
                            title="Copy Text"
                            onClick={copyToClipboard}
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount} followers
                      </div>
                      <button 
                        className={`btn-main ${isFollowing ? 'btn-following' : ''}`}
                        onClick={handleFollowToggle}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={parseInt(id)} authorName={authorName} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;