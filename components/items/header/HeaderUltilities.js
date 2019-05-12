import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import HeaderUltilitiesItem from './HeaderUltilitesItem';
import ChangeLanguage from '../common/ChangeLanguage';


const HeaderUltilities = (props) => (
    <>
        <div className="ultilities-container">
            <div onClick={() => Router.push(`/language?return=${props.router.asPath.substring(i18n.language !== 'en' ? i18n.language.length + 1 : 0, props.router.asPath.length + 1)}`)} className="ult-item-container-1 cursor-pointer noselect">
                {props.t(props.lng)}
            </div>
            <div className="ult-item-container-1 menu">
                <div onClick={() => props.setShowAdditionHeader(!props.showAdditionHeader)} className={`show-more-button-container-1 cursor-pointer ${props.showAdditionHeader ? `additional-header-showed` : ""}`}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </div>
        <style jsx>{`
            .ultilities-container{
                display: flex;
                flex: 1;

                align-tiems: center;
                justify-content: flex-end;

                height: 100%;
            }

            .ult-item-container-1 {
                display: flex;
                padding: 0 10px;

                justify-content: center;
                align-items: center;
            }

            .show-more-button-container-1 {
                display: flex;
                justify-content: center;
                align-items: center;

                border-radius: 100%;
                color: #2196F3;
                width: 30px;
                height: 30px;

                transition: background-color 0.3s, color 0.3s;
            }

            .additional-header-showed {
                color: white;
                background-color: #2196F3;
            }

            .menu {
                width: 0;
                padding: 0;
                overflow: hidden;
            }

            @media (max-width: 780px){
                .menu {
                    width: auto;
                }

                .header-additional-container-1 {
                    height: auto;
                }
            }

        `}</style>
    </>
);

HeaderUltilities.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

HeaderUltilities.propTypes = {
    t: PropTypes.func.isRequired
};


export default withNamespaces('index')(withRouter(HeaderUltilities));