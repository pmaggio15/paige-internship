import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateFollowerCount = (authorId) => {
    const seed = parseInt(authorId) || 1;
    return Math.floor((seed * 7) % 5000) + 100;
  };

  const generateWalletAddress = (authorId) => {
    const seed = parseInt(authorId) || 1;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "0x";
    for (let i = 0; i < 40; i++) {
      result += chars.charAt((seed * (i + 1)) % chars.length);
    }
    return result;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        setAuthor(null);
        setItems([]); 
        
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
        );

        if (isMounted && Array.isArray(response.data)) {
          const authorId = parseInt(id);
          
          const authorItems = response.data.filter(item => 
            item.authorId === authorId
          );

          const foundAuthor = authorItems.length > 0 ? authorItems[0] : null;

          setAuthor(foundAuthor);
          setItems(authorItems);
          
          if (!foundAuthor) {
            setError(`Author with ID ${id} not found`);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load author information');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchAuthorData();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="author-skeleton" style={{ padding: '60px 0' }}>
                    <div className="skeleton skeleton-avatar-large" style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      margin: '0 auto 25px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
                    }}></div>
                    <div className="skeleton skeleton-title" style={{
                      height: '30px',
                      width: '200px',
                      margin: '0 auto 15px',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
                    }}></div>
                    <div className="skeleton skeleton-subtitle" style={{
                      height: '20px',
                      width: '150px',
                      margin: '0 auto',
                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
                    }}></div>
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
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
          <section aria-label="section">
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

  const authorId = parseInt(id);
  
 
  let authorName = "Unknown Author";
  if (author?.author) {
    authorName = author.author;
  } else if (author?.creator) {
    authorName = author.creator;
  } else if (author?.owner) {
    authorName = author.owner;
  } else {
    authorName = `Creator ${authorId}`;
  }
  
  const followerCount = generateFollowerCount(authorId);
  const walletAddress = generateWalletAddress(authorId);
  const authorUsername = authorName.toLowerCase().replace(/\s+/g, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert('Wallet address copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy wallet address');
    });
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
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
                      <div className="profile_follower">{followerCount} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                    items={items}
                    authorId={authorId}
                    authorName={authorName}
                  />
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