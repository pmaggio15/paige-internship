import React from "react";
import Skeleton from "./Skeleton";

const TopSellersSkeleton = ({ itemCount = 12 }) => {
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {Array.from({ length: itemCount }, (_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton 
                      width="50px" 
                      height="50px" 
                      borderRadius="50%" 
                    />
                  </div>
                  <div className="author_list_info">
                    <div style={{ marginBottom: "8px" }}>
                      <Skeleton 
                        width="120px" 
                        height="16px" 
                        borderRadius="4px" 
                      />
                    </div>
                    <Skeleton 
                      width="80px" 
                      height="14px" 
                      borderRadius="4px" 
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellersSkeleton;