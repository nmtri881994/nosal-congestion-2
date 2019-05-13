import NavItem from './HeaderNavMainItem';

const HeaderNavigation = (props) => (
    <>
        <nav className="main-nav">
            {props.navItems.map(item => <NavItem key={item.id} item={item} />)}
        </nav>
        <style jsx>{`
            .main-nav {
                display: flex;
                flex-direction: row;
                overflow-x: hidden;
                overflow-y: hidden;
                height: 100%;

                // flex: 1;
                align-items: stretch;
            }

            @media (max-width: 1000px) {
                .main-nav {
                    display: none;
                }
            }
        `}</style>
    </>
);

export default HeaderNavigation;