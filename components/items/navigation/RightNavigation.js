const RightNavigation = (props) => (
    <>
        <div className="main-right-navigation">
            <div>
                <div className="nav-content-container-1">
                    <div className="nav-content-container-2">
                        <div className="nav-content-container-3">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>
            {`

            @media (max-width: 979px) and (min-width: 600px) 
            {
                .main-right-navigation {
                    margin-left: 40px;
                }   

                .nav-content-container-1 {
                    margin-left: 40px;
                }   
            }

            @media (max-width: 1339px) and (min-width: 600px) {

                .main-right-navigation {
                    flex: 0 0 200px;
                }  

                .nav-content-container-1 {
                    flex: 0 0 200px;
                }  
                
            }

            @media (min-width: 1100px) {

                .main-right-navigation {
                    flex: 0 0 300px;
                }  

                .nav-content-container-1 {
                    flex: 0 0 300px;
                }  
            }

            @media (min-width: 2000px) {

                .main-right-navigation {
                    position: fixed;
                    right: 0;
                    width: 300px;
                    z-index: 2;
                }
                

                .nav-content-container-1 {
                    border-left: 1px solid #ececec;
                }  
            }

            .main-right-navigation {
                margin-left: 40px;
                display: flex;
                flex-direction: column;
            }

            .nav-content-container-1 {
                position: fixed;
                z-index: 2;
                overflow-y: auto;
                margin-right: -999px;
                padding-right: 999px;
                background-color: #f7f7f7;
                opacity: 1 !important;

                height: calc(100vh - 50px);
                border-left: 1px solid #ececec;
            }
        `}

        </style>
    </>
);

export default RightNavigation;