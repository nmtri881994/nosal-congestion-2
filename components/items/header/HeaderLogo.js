const HeaderLogo = (props) => (
    <>
        <a className="logo" href="/">
            {/* <img src={props.logo.image} alt="" height="20" /> */}
            <span className="website-name">
                {props.logo.name}
            </span>
        </a>
        <style jsx>{`
            @media (min-width: 600px) {
                .logo {
                    width: calc(100%/6);
                }
            }

            .logo {
                display: flex;
                margin-right: 10px;
                height: 100%;
                align-items: center;
            }

            .website-name {
                color: inherit;
                margin-left: 10px;
                font-weight: 700;
                font-size: 20px;
                line-height: 20px;

                color: white;
            }
        `}</style>
    </>
);

export default HeaderLogo;