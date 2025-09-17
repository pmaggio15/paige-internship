import React from "react";
import Skeleton from "./Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton 
                  width="100%" 
                  height="400px" 
                  borderRadius="12px" 
                />
              </div>
              
              <div className="col-md-6">
                <div className="item_info">

                  <div style={{ marginBottom: '20px' }}>
                    <Skeleton 
                      width="80%" 
                      height="40px" 
                      borderRadius="4px" 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <Skeleton 
                      width="80px" 
                      height="24px" 
                      borderRadius="4px" 
                    />
                    <Skeleton 
                      width="80px" 
                      height="24px" 
                      borderRadius="4px" 
                    />
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <Skeleton 
                      width="100%" 
                      height="16px" 
                      borderRadius="4px" 
                    />
                    <div style={{ marginTop: '8px' }}>
                      <Skeleton 
                        width="90%" 
                        height="16px" 
                        borderRadius="4px" 
                      />
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <Skeleton 
                        width="75%" 
                        height="16px" 
                        borderRadius="4px" 
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <Skeleton 
                        width="60px" 
                        height="20px" 
                        borderRadius="4px" 
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <Skeleton 
                        width="50px" 
                        height="50px" 
                        borderRadius="50%" 
                      />
                      <Skeleton 
                        width="120px" 
                        height="20px" 
                        borderRadius="4px" 
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <Skeleton 
                        width="60px" 
                        height="20px" 
                        borderRadius="4px" 
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <Skeleton 
                        width="50px" 
                        height="50px" 
                        borderRadius="50%" 
                      />
                      <Skeleton 
                        width="120px" 
                        height="20px" 
                        borderRadius="4px" 
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <Skeleton 
                        width="50px" 
                        height="20px" 
                        borderRadius="4px" 
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Skeleton 
                        width="24px" 
                        height="24px" 
                        borderRadius="4px" 
                      />
                      <Skeleton 
                        width="100px" 
                        height="24px" 
                        borderRadius="4px" 
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

export default ItemDetailsSkeleton;