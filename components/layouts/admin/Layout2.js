import UserInformation from '../../items/admin/UserInformation';
import SystemMessage from '../../items/common/SystemMessage';
import { i18n, Link, withNamespaces } from '../../../configs/i18next';
import PropTypes from 'prop-types';

const leftNavigations = [
    { id: 1, key: "translate", label: 'translate', link: '/admin/translate' },
    { id: 2, key: "split-money", label: 'split-money', link: '/admin/split-money' }
]

const Layout2 = (props) => (
    <>
        <div className="page">
            <SystemMessage />
            <div className="left-part-container-1">
                <div className="navigation">
                    <UserInformation originalUrl={props.originalUrl} />
                    <div className="user-navigation-container-1">
                        <div className="user-navigation-container-2">
                            <div className="user-navigation-container-3">
                                {leftNavigations.map(nav =>
                                    <Link key={nav.id} href={nav.link}>
                                        <div className={`nav-item-lv1-container-1 ${nav.key === props.selectedNav ? "selected-nav" : null}`}>
                                            <div className="nav-item-lv1" >

                                                <a>
                                                    {props.t(nav.label)}
                                                </a>
                                            </div>
                                        </div>
                                    </Link>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-part-container-1">
                <div className="main-part-container-2">
                    <div className="main-part-content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .page {
                outline: none;

                display: flex;
                flex-direction: row;
                height: calc(100vh - 20px);
            }

            .left-part-container-1 {
                display: flex;

                width: 220px;

                padding-right: 10px;
            }

            .navigation {
                display: flex;
                flex: 1;

                flex-direction: column;
            }

            

            .user-navigation-container-1 {
                display: flex;
                flex: 1;

                padding-top: 10px;
            }

            .user-navigation-container-2 {
                display: flex;
                flex: 1;
                
                background-color: #e8e9ea;
                border-radius: 5px;
                padding:20px 10px;
            }
            
            .user-navigation-container-3 {
                display: flex;
                flex: 1;
                flex-direction: column;
            }

            .nav-item-lv1-container-1{
                display: flex;
                min-height: 30px;
                border-radius: 5px;
                padding: 0 10px;                

                align-items: center;

                cursor: pointer;

                transition: background-color 0.5s;
            }

            .nav-item-lv1-container-1:hover {
                background-color: white;
            }
            
            .nav-item-lv1 {
                display: flex;
            }

            .selected-nav {
                background-color: white;
            }

            .main-part-container-1{
                display: flex;
                flex: 1;

                min-width: 600px;
                background-color: #e8e9ea;
                border-radius: 5px;

                padding: 20px 20px;

                overflow: auto;
            }

            .main-part-container-2{
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            .main-part-content {
                display: flex;
                flex-direction: column;
            }

            
        `}</style>
    </>

);

Layout2.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
}

Layout2.propTypes = {
    t: PropTypes.func.isRequired
}

export default withNamespaces('admin')(Layout2);