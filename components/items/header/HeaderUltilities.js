import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

import { logout as logoutAction } from '../../../actions/login';

import HeaderUltilitiesItem from './HeaderUltilitesItem';
import ChangeLanguage from '../common/ChangeLanguage';


const HeaderUltilities = (props) => (
    <>
        <div className="ultilities-container">
            <div className="ult-item-container-1 create-post-container-1">
                <div className="create-post-container-2 cursor-pointer noselect" onClick={() => Router.push("/admin/translate")}>
                    {props.t('create-post')}
                </div>
            </div>
            <div onClick={() => Router.push(`/language?return=${props.router.asPath.substring(i18n.language !== 'en' ? i18n.language.length + 1 : 0, props.router.asPath.length + 1)}`)} className="ult-item-container-1 cursor-pointer noselect">
                {props.t(props.lng)}
            </div>

            {props.loginUser.systemAccessToken === "" ? < div onClick={() => Router.push(`/login?previous=${props.router.asPath.substring(i18n.language !== 'en' ? i18n.language.length + 1 : 0, props.router.asPath.length + 1)}`)}
                className="ult-item-container-1 cursor-pointer noselect login-logout-button">
                {props.t('login')}
            </div> :
                <>
                    <div className="ult-item-container-1 cursor-pointer noselect">
                        <div className="user-avatar"></div>
                    </div>
                    <div onClick={() => props.dispatch(logoutAction(props.loginUser.refreshToken))} className="ult-item-container-1 cursor-pointer noselect login-logout-button">
                        {props.t('logout')}
                    </div>
                </>
            }

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
                display: none;
                overflow: hidden;
            }

            .create-post-container-1 {
                display: flex;
            }

            .create-post-container-2 {
                // background-color: #43a047;
                background-color: rgb(255,255,255,.2);
                border-radius: 5px;
                padding: 5px 10px;
            }

            .create-post-container-2:hover {
                background-color: rgb(255,255,255,.3);
            }

            .user-avatar {
                display: flex;
                height: 35px;
                width: 35px;

                border-radius: 5px;
                background-image: url("${props.loginUser ? props.loginUser.userInfo.avatar : ''}");
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            @media (max-width: 1000px){
                .menu {
                    display: flex;
                }

                .login-logout-button {
                    display: none;
                }

                .create-post-container-1 {
                    display: none;
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

function mapStateToProps(state) {
    // console.log("headerUser", state);
    return {
        loginUser: state.loginUser
    };
};

export default withNamespaces('index')(withRouter(connect(mapStateToProps)(HeaderUltilities)));