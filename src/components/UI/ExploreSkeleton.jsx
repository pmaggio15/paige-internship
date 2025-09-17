import React from "react";
import Skeleton from "./Skeleton";

const ExploreSkeleton = ({ itemCount = 8 }) => {
  return (
    <>

      <div>
        <Skeleton 
          width="200px" 
          height="40px" 
          borderRadius="4px" 
        />
      </div>
      
      {Array.from({ length: itemCount }, (_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <div style={{ position: "relative" }}>
                <Skeleton 
                  width="50px" 
                  height="50px" 
                  borderRadius="50%" 
                />
                <div style={{ position: "absolute", bottom: "-2px", right: "-2px" }}>
                  <Skeleton 
                    width="16px" 
                    height="16px" 
                    borderRadius="50%" 
                  />
                </div>
              </div>
            </div>
            
            <div style={{ position: "absolute", top: "15px", right: "15px" }}>
              <Skeleton 
                width="80px" 
                height="24px" 
                borderRadius="12px" 
              />
            </div>

            <div className="nft__item_wrap">
              <Skeleton 
                width="100%" 
                height="250px" 
                borderRadius="8px" 
              />
            </div>

            <div className="nft__item_info" style={{ padding: "15px" }}>
              <div style={{ marginBottom: "10px" }}>
                <Skeleton 
                  width="70%" 
                  height="24px" 
                  borderRadius="4px" 
                />
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Skeleton 
                  width="80px" 
                  height="20px" 
                  borderRadius="4px" 
                />
                
                <Skeleton 
                  width="40px" 
                  height="16px" 
                  borderRadius="4px" 
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      
      <div className="col-md-12 text-center">
        <div style={{ margin: "20px 0" }}>
          <Skeleton 
            width="120px" 
            height="40px" 
            borderRadius="20px" 
          />
        </div>
      </div>
    </>
  );
};

export default ExploreSkeleton;