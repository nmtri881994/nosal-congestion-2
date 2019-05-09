import Header from '../basic/Header';
import HeaderLogo from '../basic/HeaderLogo';
import HeaderNavigation from '../basic/HeaderNavigation';
import HeaderUltilites from '../basic/HeaderUltilities';
import HeaderUser from '../basic/HeaderUser';

import SystemMessage from '../../items/SystemMessage';

const navItems = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Next.js' },
    { id: 3, name: null }
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
    }
    // ,
    // {
    //     id: 2,
    //     url: 'https://github.com/nmtri881994',
    //     name: 'Github'
    // }
]

const Layout = (props) => (
    <>
        <div className="page">
            <Header LogoComponent={<HeaderLogo logo={logoInfo} />} NavComponent={<HeaderNavigation navItems={navItems} />}
                UltiComponent={<HeaderUltilites items={ultilities} />} UserComponent={<HeaderUser userInfo={props.userInfo} />} />
            <div className="main-container-1">
                <div className="main-container-2">
                    <SystemMessage />
                </div>
            </div>
        </div>
        <style jsx>
            {`
            .main-container-1{
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                align-items: flex-start;

                margin-top: 42px;

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

                margin-top: 42px;

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
                width: 90%;

                padding-left: 20px;
                padding-right: 20px;
                margin-left: auto;
                margin-right: auto;
            }

            .main-container-4{
                display: flex;
                min-height: calc(100vh - 50px);
            }

            .content {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                box-align: stretch;
                align-item: stretch;
            }
        `}
        </style>
        <style jsx global>
            {`
                a {
                    color: inherit;
                    text-decoration: none !important;

                    background-color: transparent;
                }
            `}
        </style>
    </>
);

export default Layout;