import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useEffect } from 'react';

import ChangeLanguage from '../common/ChangeLanguage';

import { testToken as apiTestToken, retryRequest } from '../../../apis/userAuth';

const UserInformation = (props) => {

    useEffect(() => {
        async function testToken() {
            // if (props.loginUser.systemAccessToken && props.loginUser.systemAccessToken !== "") {
            console.log(props.loginUser.systemAccessToken);
            const testTokenRes = await apiTestToken({
                systemAccessToken: props.loginUser.systemAccessToken,
                originalUrl: props.originalUrl
            });
            if (testTokenRes) {
                const testToken = await testTokenRes.json();
                if (testTokenRes.status === 401 && testToken.error.name === "TokenExpiredError") {
                    retryRequest(apiTestToken, {
                        systemAccessToken: props.loginUser.systemAccessToken,
                        originalUrl: props.originalUrl
                    }, props.loginUser.refreshToken, props.dispatch);
                }
            }
        };

        testToken();
    });

    return (
        <>
            <div className="information-container-1">
                <div className="information-container-2">
                    <div className="item">
                        <div className="user-avatar">
                        </div>
                        <div className="user-first-name">
                            {props.loginUser.userInfo.firstName}
                        </div>
                    </div>
                    <div className="item">
                        <ChangeLanguage />

                    </div>

                </div>
            </div>
            <style jsx>{`
                .information-container-1 {
                    display: flex;
                    // height: 50px;
                }

                .information-container-2 {
                    display: flex;
                    flex: 1;
                    flex-direction: column;

                    background-color: #e8e9ea;
                    border-radius: 5px;

                    padding: 5px 10px;
                }

                .item {
                    display: flex;
                    flex-direction: row;
                    
                    justify-content: flex-start;
                    align-items: center;

                    margin: 3px 0px;
                }

                .item:first-of-type {
                    margin-top: 0;
                }
                
                .item:last-of-type {
                    margin-bottom: 0;
                }

                .user-avatar {
                    display: flex;
                    height: 40px;
                    width: 40px;

                    border-radius: 5px;
                    background-image: url("${props.loginUser ? props.loginUser.userInfo.avatar : ''}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .user-first-name {
                    display: flex;
                    flex: 1;

                    padding: 0 10px;
                }
            `}</style>
        </>
    )
};

function mapStateToProps(state) {
    // console.log("headerUser", state);
    return {
        loginUser: state.loginUser
    };
};

// const mapDispatchToProps = dispatch => bindActionCreators({ testToken }, dispatch);


export default connect(mapStateToProps)(UserInformation);