// import React from "react";
// import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";

// const HotCollections = () => {
  
//   return (
//     <section id="section-collections" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2>Hot Collections</h2>
//               <div className="small-border bg-color-2"></div>
//             </div>
//           </div>
//           {new Array(4).fill(0).map((_, index) => (
//             <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
//               <div className="nft_coll">
//                 <div className="nft_wrap">
//                   <Link to="/item-details">
//                     <img src={nftImage} className="lazy img-fluid" alt="" />
//                   </Link>
//                 </div>
//                 <div className="nft_coll_pp">
//                   <Link to="/author">
//                     <img className="lazy pp-coll" src={AuthorImage} alt="" />
//                   </Link>
//                   <i className="fa fa-check"></i>
//                 </div>
//                 <div className="nft_coll_info">
//                   <Link to="/explore">
//                     <h4>Pinky Ocean</h4>
//                   </Link>
//                   <span>ERC-192</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";

// const HotCollections = () => {
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   const [sliderRef, instanceRef] = useKeenSlider(
//     {
//       initial: 0,
//       slides: {
//         perView: 4,
//         spacing: 30,
//       },
//       loop: true,
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel);
//       },
//       created() {
//         setLoaded(true);
//       },
//       breakpoints: {
//         "(max-width: 480px)": {
//           slides: {
//             perView: 1,
//             spacing: 10,
//           },
//         },
//         "(min-width: 481px) and (max-width: 768px)": {
//           slides: {
//             perView: 1,
//             spacing: 15,
//           },
//         },
//         "(min-width: 769px) and (max-width: 992px)": {
//           slides: {
//             perView: 2,
//             spacing: 20,
//           },
//         },
//         "(min-width: 993px)": {
//           slides: {
//             perView: 4,
//             spacing: 30,
//           },
//         },
//       },
//     }
//   );

//   useEffect(() => {
//     axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
//       .then(response => {
//         if (Array.isArray(response.data)) {
//           setCollections(response.data);
//         }
//       })
//       .catch(error => {
//         setCollections([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const itemsToShow = collections.length > 0 ? collections : new Array(8).fill({});

//   if (loading) {
//     return (
//       <section id="section-collections" className="no-bottom">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="text-center">
//                 <h2>Hot Collections</h2>
//                 <div className="small-border bg-color-2"></div>
//                 <p>Loading collections...</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="section-collections" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2>Hot Collections</h2>
//               <div className="small-border bg-color-2"></div>
//             </div>
//           </div>
//           <div className="col-lg-12">
//             <div className="navigation-wrapper">
//               <div ref={sliderRef} className="keen-slider">
//                 {itemsToShow.map((collection, index) => (
//                   <div key={index} className="keen-slider__slide">
//                     <div className="nft_coll">
//                       <div className="nft_wrap">
//                         <Link to="/item-details">
//                           <img 
//                             src={collection.nftImage || nftImage} 
//                             className="lazy img-fluid" 
//                             alt=""
//                             onError={(e) => {
//                               e.target.src = nftImage;
//                             }}
//                           />
//                         </Link>
//                       </div>
//                       <div className="nft_coll_pp">
//                         <Link to="/author">
//                           <img 
//                             className="lazy pp-coll" 
//                             src={collection.authorImage || AuthorImage} 
//                             alt=""
//                             onError={(e) => {
//                               e.target.src = AuthorImage;
//                             }}
//                           />
//                         </Link>
//                         <i className="fa fa-check"></i>
//                       </div>
//                       <div className="nft_coll_info">
//                         <Link to="/explore">
//                           <h4>{collection.title || "Pinky Ocean"}</h4>
//                         </Link>
//                         <span>{collection.code || "ERC-192"}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {loaded && instanceRef.current && (
//                 <>
//                   <button
//                     className="arrow arrow--left"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       instanceRef.current?.prev();
//                     }}
//                   >
//                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                       <path d="M7.5 9C7.5 9 4.5 6.41421 4.5 6C4.5 5.58579 7.5 3 7.5 3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </button>
//                   <button
//                     className="arrow arrow--right"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       instanceRef.current?.next();
//                     }}
//                   >
//                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                       <path d="M4.5 3C4.5 3 7.5 5.58579 7.5 6C7.5 6.41421 4.5 9 4.5 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HotCollections;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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
        "(max-width: 480px)": {
          slides: {
            perView: 1,
            spacing: 10,
          },
          duration: 600,
          mode: "snap",
        },
        "(min-width: 481px) and (max-width: 768px)": {
          slides: {
            perView: 1,
            spacing: 15,
          },
          duration: 700,
          mode: "snap",
        },
        "(min-width: 769px) and (max-width: 992px)": {
          slides: {
            perView: 2,
            spacing: 20,
          },
          duration: 750,
          mode: "free-snap",
        },
        "(min-width: 993px)": {
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
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCollections(response.data);
        }
      })
      .catch(error => {
        setCollections([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const itemsToShow = collections.length > 0 ? collections : new Array(8).fill({});

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="navigation-wrapper">
                <div className="keen-slider skeleton-slider">
                  {new Array(4).fill(0).map((_, index) => (
                    <div key={index} className="keen-slider__slide">
                      <div className="nft_coll skeleton-card">
                        <div className="nft_wrap skeleton-item">
                          <div className="skeleton skeleton-image"></div>
                        </div>
                        <div className="nft_coll_pp skeleton-item">
                          <div className="skeleton skeleton-avatar"></div>
                        </div>
                        <div className="nft_coll_info skeleton-item">
                          <div className="skeleton skeleton-title"></div>
                          <div className="skeleton skeleton-subtitle"></div>
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

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {itemsToShow.map((collection, index) => (
                  <div key={index} className="keen-slider__slide">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img 
                            src={collection.nftImage || nftImage} 
                            className="lazy img-fluid" 
                            alt=""
                            onError={(e) => {
                              e.target.src = nftImage;
                            }}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img 
                            className="lazy pp-coll" 
                            src={collection.authorImage || AuthorImage} 
                            alt=""
                            onError={(e) => {
                              e.target.src = AuthorImage;
                            }}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title || "Pinky Ocean"}</h4>
                        </Link>
                        <span>{collection.code || "ERC-192"}</span>
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

export default HotCollections;