import React from "react";
import Skeleton from "./Skeleton";

const NFTItemsSkeleton = ({ itemCount = 4 }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {Array.from({ length: itemCount }, (_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton 
                    width="50px" 
                    height="50px" 
                    borderRadius="50%" 
                  />
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <Skeleton 
                        width="80px" 
                        height="32px" 
                        borderRadius="4px" 
                      />
                      <div className="nft__item_share">
                        <Skeleton 
                          width="40px" 
                          height="16px" 
                          borderRadius="4px" 
                        />
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                          <Skeleton width="24px" height="24px" borderRadius="50%" />
                          <Skeleton width="24px" height="24px" borderRadius="50%" />
                          <Skeleton width="24px" height="24px" borderRadius="50%" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Skeleton 
                    width="100%" 
                    height="200px" 
                    borderRadius="8px" 
                  />
                </div>
                <div className="nft__item_info">
                  <div style={{ marginBottom: "8px" }}>
                    <Skeleton 
                      width="150px" 
                      height="20px" 
                      borderRadius="4px" 
                    />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <Skeleton 
                      width="80px" 
                      height="16px" 
                      borderRadius="4px" 
                    />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton width="24px" height="16px" borderRadius="4px" />
                    <Skeleton width="30px" height="16px" borderRadius="4px" />
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

export default NFTItemsSkeleton;