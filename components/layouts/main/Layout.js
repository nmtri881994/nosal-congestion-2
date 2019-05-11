import Header from '../../items/header/Header';
import HeaderLogo from '../../items/header/HeaderLogo';
import HeaderNavigation from '..//../items/header/HeaderNavigation';
import RightNavigation from '../../items/navigation/RightNavigation';
import HeaderUltilites from '../../items/header/HeaderUltilities';

const navItems = [
    { id: 1, name: 'technology', link: "/technology" },
    { id: 2, name: 'cinematic', link: "/cinematic" },
    { id: 3, name: 'music', link: "/music" },
    { id: 4, name: 'life', link: "/life" },
];

const logoInfo = {
    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    name: 'Nosal Congestion'
}

const ultilities = [
    {
        id: 1,
        url: '/',
        name: 'Languages'
    },
    {
        id: 2,
        url: 'https://github.com/nmtri881994',
        name: 'Github'
    }
]

const Layout = (props) => (
    <>
        <div className="page">
            <Header LogoComponent={<HeaderLogo logo={logoInfo} />} NavComponent={<HeaderNavigation navItems={navItems} />}
                UltiComponent={<HeaderUltilites items={ultilities} />} />
            <div className="main-container-1">
                <div className="main-container-2">
                    <div className="main-container-3">
                        <div className="main-container-4">
                            <div className="content">
                                {props.children}
                            </div>
                            {/* <RightNavigation /> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <style jsx>
            {`
            .page {
                outline: none;

                display: flex;
                flex-direction: column;
                min-height: calc(100vh - 40px);
            }

            .main-container-1{
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                align-items: flex-start;

                margin-top: 50px;

                flex: 1 0 auto;

            }

            .main-container-2{
                display: flex;
                justify-content: flex-start;
                align-items: stretch;

                width: 100%;
                position: relative;
                z-index: 0;
                flex: 1 0 auto;
            }

            .main-container-3{
                margin-left: auto;
                margin-right: auto;
            }

            .main-container-4{
                display: flex;
                min-height: calc(100vh - 50px);

                justify-content: center;
            }

            .content {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                box-align: stretch;
                align-item: stretch;

                width: 1200px;

                padding: 50px 20px;

                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                background-color: white;

            }

            @media (max-width: 1240px){
                .main-container-3 {
                    width: 100%;
                    padding: 0;
                }
            }
        `}
        </style>
    </>
);

export default Layout;