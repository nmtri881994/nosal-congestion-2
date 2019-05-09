import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Router from 'next/router';
import jsCookie from 'js-cookie';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { i18n, withNamespaces, Router } from '../configs/i18next';

import { informAnnouncement } from '../actions/informAnnouncement'
import { login as actionLogin, updateToken } from '../actions/login'

import FacebookLoginButton from '../components/items/login/FacebookLoginButton';
import GoogleLoginButton from '../components/items/login/GoogleLoginButton';
// import GoogleLoginButton from '../../components/items/';
import SystemMessage from '../components/items/common/SystemMessage';

import { login as apiLogin, retryRequest, testToken as apiTestToken, getNewToken } from '../apis/userAuth';

const isServer = typeof window === 'undefined';

const AdminLogin = (props) => {

    const [isFacebookLogging, setIsFacebookLogging] = useState(false);

    const [isGoogleLogging, setIsGoogleLogging] = useState(false);

    const [isLogging, setIsLogging] = useState(false);

    const [previousPath, setPreviousPath] = useState("");

    useEffect(() => {
        setPreviousPath(props.router.query.previous);
        // if (!isServer) {
        //     setPreviousPath(findGetParameter('previous'));
        //     console.log(previousPath);
        // } else {
        //     setPreviousPath(props.previousPath);
        //     console.log(previousPath);
        // }
        // setPreviousPath('1111');
        // console.log(previousPath);
    })

    useEffect(() => {
        async function testToken() {
            // if (props.loginUser.systemAccessToken && props.loginUser.systemAccessToken !== "") {

            // console.log('login', props.loginUser);
            const testTokenRes = await apiTestToken({ systemAccessToken: props.loginUser.systemAccessToken });
            if (testTokenRes) {
                const testToken = await testTokenRes.json();
                if (testTokenRes.status === 401 && testToken.error.name === "TokenExpiredError") {
                    const getNewTokenRes = await getNewToken(props.loginUser.refreshToken);
                    // console.log(getNewTokenRes);
                    if (getNewTokenRes) {
                        const newToken = await getNewTokenRes.json();
                        // console.log(newToken);
                        if (getNewTokenRes.status === 200) {
                            updateToken({
                                systemAccessToken: newToken.systemAccessToken,
                                refreshToken: newToken.refreshToken
                            });
                            if (previousPath !== undefined && previousPath !== "") {
                                await Router.push(previousPath);
                            } else {
                                await Router.push('/');
                            }
                        }
                    }
                }

                if (testTokenRes.status === 200) {
                    if (previousPath !== undefined && previousPath !== "") {
                        await Router.push(previousPath);
                    } else {
                        await Router.push('/');
                    }
                }
            }

            // } else {
            // Router.push('/admin/login');
            // }
        };

        if (!isLogging && props.loginUser.systemAccessToken) {
            testToken();
        }

    });

    const [user, setUser] = useState({});

    useEffect(() => {
        const { informAnnouncement, actionLogin } = props;
        async function login() {
            let res = await apiLogin(user);
            const data = await res.json();

            if (res.status !== 200) {
                if (user.accountType === 'facebook') {
                    setIsFacebookLogging(false);
                    setIsLogging(false);
                };

                if (user.accountType === 'google') {
                    setIsGoogleLogging(false);
                    setIsLogging(false);
                };

                informAnnouncement({
                    type: 2,
                    content: "Login Failed"
                })
            }

            if (res.status === 200) {
                const { systemAccessToken, refreshToken, userInfo } = data;

                jsCookie.set('user', { systemAccessToken, refreshToken, userInfo });

                actionLogin({ systemAccessToken, refreshToken, userInfo });
                if (previousPath !== undefined && previousPath !== "") {
                    await Router.push(previousPath);
                } else {
                    await Router.push('/');
                }



                informAnnouncement({
                    type: 1,
                    content: "Welcome to Nosal Congestion"
                })
            }
        };

        if (user.accessToken) {
            if (user.accountType === 'facebook') {
                setIsFacebookLogging(true);
                setIsLogging(true);
            }
            if (user.accountType === 'google') {
                setIsGoogleLogging(true);
                setIsLogging(true);
            }

            login();
        }
    }, [user]);

    return (
        <>
            <div className="login-container-1">
                {/* {console.log(1111, props)}   */}
                <SystemMessage />
                <div className="login-container-2">
                    <div className="login-title">
                        {props.t('welcome')}
                    </div>
                    <div className="login-options-container">
                        <div className="login-option-container">
                            <FacebookLoginButton isFacebookLogging={isFacebookLogging} isLogging={isLogging}
                                isGoogleLogging={isGoogleLogging} setUser={setUser} title={props.t('login-via-facebook')} />
                        </div>
                        <div className="login-option-container">
                            <GoogleLoginButton isFacebookLogging={isFacebookLogging} isLogging={isLogging}
                                isGoogleLogging={isGoogleLogging} setUser={setUser} title={props.t('login-via-google')} />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .login-container-1 {
                display: flex;
                flex-direction: column;
                
                height: 100%;
                width: 100%;
                position: fixed;
                z-index: 1;
                top: 0;
                left: 0;
                background-color: #f9f9f9;
                overflow-x: hidden;

                align-items: center;
                justify-content: center;
            }

            .login-container-2 {
                display: flex;
                flex-direction: column;
                height: 180px;
                width: 290px;
                background-color: white;

                // border: 1px #ececec solid;
                border-radius: 0px 10px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }

            .login-title {
                display: flex;
                height: 50px;
                // width: calc(100vw-20px);

                // background-color: #d9d9d9;
                align-items: center;
                justify-content: flex-start;

                border-top-right-radius: 8px;
                border-bottom: 1.5px solid #d9d9d9;

                z-index: 2;

                color: black;
                font-size: 30px;
                padding: 0 20px;
            }

            .login-options-container {
                display: flex;
                flex: 1;
                flex-direction: column;
            }

            .login-option-container{
                display: flex;
                flex: 1;

                align-items: center;
                justify-content: center;

                // margin: 0px 20px;
            }
        `}</style>
        </>
    )
};

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

AdminLogin.getInitialProps = async function ({ req }) {
    return {
        namespacesRequired: ['login'],
        previousPath: req ? req.query.previous : ""
    }
}

AdminLogin.propTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ informAnnouncement, actionLogin, updateToken }, dispatch);

export default withNamespaces('login', 'aaa')(connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminLogin)));