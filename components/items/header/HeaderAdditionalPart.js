import PropTypes from 'prop-types';

import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

const HeaderAdditionalPart = (props) => {
    return (
        <>
            {props.showAdditionHeader ?
                <div className="header-additional-part-container-1 noselect">
                    {props.navItems.map(item => <Link key={item.id} href={item.link}>
                        <a className="nav-item">
                            <div className="item-container-1">
                                {props.t(item.name ? item.name : '-')}
                            </div>
                        </a>
                    </Link>)}

                </div> : null}

            <style jsx>{`
                .header-additional-part-container-1 {
                    display: flex;
                    flex-direction: column;
                    margin: 10px 20px;
                }

                .item-container-1 {
                    display: flex;
                    justify-content: center;
                    padding: 10px 0;

                    background-color: #4d5466;
                    
                    color: white;
                }

                .nav-item:not(:first-of-type){
                    margin-top: 10px;
                }
            `}</style>
        </>
    )
};


HeaderAdditionalPart.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

HeaderAdditionalPart.propTypes = {
    t: PropTypes.func.isRequired
};

export default withNamespaces('index')(HeaderAdditionalPart);