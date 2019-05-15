import React, { useState, useEffect } from 'react';
import { FacebookProvider, Login } from 'react-facebook';

import config from '../../../configs/appConfig';

function FacebookLoginButton(props) {

    function _onFacebookResponse(facebookRes) {
        // console.log(1, facebookRes);
        props.setUser({
            'name': facebookRes.profile.name,
            'firstName': facebookRes.profile.first_name,
            'lastName': facebookRes.profile.last_name,
            'email': facebookRes.profile.email,
            'accountId': facebookRes.profile.id,
            'accessToken': facebookRes.tokenDetail.accessToken,
            'avatar': facebookRes.profile.picture.data.url,
            'accountType': 'facebook'
        });
    };

    return (
        <>
            <FacebookProvider appId="2001686046743959">
                <Login
                    scope="email"
                    onCompleted={_onFacebookResponse}
                    onError={() => { }}
                >
                    {({ loading, handleClick, error, data }) => (
                        <span disabled={props.isGoogleLogging} onClick={handleClick} className={props.isLogging ? "disabled-facebook-button" : "facebook-button"}>
                            {!props.isFacebookLogging ? props.title :
                                <img src={config.LOGGING_WAITING_GIF} className="login-loading-gif" />
                            }
                        </span>
                    )}
                </Login>
            </FacebookProvider>
            <style jsx>{`
                .facebook-button{
                    height: 40px;
                    width: 100%;

                    padding: 0px 20px;
                
                    /* border-radius: 5px; */
                    
                    color: white;
                    background-color: #4c66a4;
                
                    border: none;
                    border-radius: 5px;
                
                    font-size: 16px;
                    font-weight: 700;
                
                    cursor: pointer;
                    
                    display: flex;
                    align-items: center;
                    // justify-content: center;

                    margin: 0 20px;
                    transition: box-shadow 0.2s ease-in-out;
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0);
                }

                .disabled-facebook-button {
                    height: 40px;
                    width: 100%;

                    padding: 0px 20px;
                
                    /* border-radius: 5px; */
                    
                    color: white;
                    background-color: #4c66a4;
                
                    border: none;
                    border-radius: 5px;
                
                    font-size: 16px;
                    font-weight: 700;
                
                    cursor: pointer;
                    
                    display: flex;
                    align-items: center;
                    // justify-content: center;

                    margin: 0 20px;

                    pointer-events: none;
                    opacity: 0.4;
                }

                .facebook-button:hover {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
                
                .login-loading-gif{
                    height: 100%;
                }
            `}</style>
        </>

    );
};

export default FacebookLoginButton;