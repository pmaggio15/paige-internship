import React from "react";
import Skeleton from "./Skeleton";
import AuthorBanner from "../../images/author_banner.jpg";

const AuthorProfileSkeleton = () => {
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
                      <Skeleton 
                        width="150px" 
                        height="150px" 
                        borderRadius="50%" 
                      />
                      <div className="profile_name">
                        <div style={{ marginBottom: "10px" }}>
                          <Skeleton 
                            width="200px" 
                            height="24px" 
                            borderRadius="4px" 
                          />
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <Skeleton 
                            width="120px" 
                            height="16px" 
                            borderRadius="4px" 
                          />
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <Skeleton 
                            width="300px" 
                            height="14px" 
                            borderRadius="4px" 
                          />
                        </div>
                        <Skeleton 
                          width="60px" 
                          height="30px" 
                          borderRadius="4px" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div style={{ marginBottom: "15px" }}>
                        <Skeleton 
                          width="100px" 
                          height="16px" 
                          borderRadius="4px" 
                        />
                      </div>
                      <Skeleton 
                        width="80px" 
                        height="40px" 
                        borderRadius="20px" 
                      />
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

export default AuthorProfileSkeleton;