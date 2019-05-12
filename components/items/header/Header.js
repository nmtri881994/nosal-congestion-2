
const Header = (props) => (
    <>
        <header className="header">
            <div className="header-container-1">
                <div className="header-container-2">
                    <>
                        {props.LogoComponent}
                    </>
                    <>
                        {props.NavComponent}
                    </>
                    <>
                        {props.UltiComponent}
                    </>
                    <>
                        {props.UserComponent}
                    </>
                </div>
            </div>
            <div className="header-additional-container-1">
                {props.additionalPart}
            </div>
        </header>
        <style jsx>{`
            

            .header {
                background-color: #20232a;
                color: white;
                position: fixed;
                z-index: 1;
                width: 100%;
                top: 0;
                left: 0;
            }

            .header-container-1 {
                padding-left: 20px;
                padding-right: 20px;
                margin-left: auto;
                margin-right: auto;
            }

            .header-container-2 {
                height: 50px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .header-additional-container-1 {
                height: 0;
                padding: 0;
                
                overflow: hidden;

                transition: height 0.5s;
            }
            
            @media (max-width: 780px){
                
                .header-additional-container-1 {
                    height: auto;
                }
            }

            @media (min-width: 780px){
                .header-container-1 {
                    width: 90%;
                }
            }

            @media (min-width: 1340px){
                .header-container-1 {
                    max-width: 1260px;
                }
            }
        `}</style>
    </>
);

export default Header;