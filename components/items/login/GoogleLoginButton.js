import React, { useState, useEffect } from 'react';
import config from '../../../configs/appConfig';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = (props) => {
    function _onGoogleResponse(googleRes) {
        // console.log(1, googleRes);
        props.setUser({
            'name': googleRes.profileObj.name,
            'firstName': googleRes.profileObj.givenName,
            'lastName': googleRes.profileObj.familyName,
            'email': googleRes.profileObj.email,
            'accountId': googleRes.googleId,
            'accessToken': googleRes.accessToken,
            'avatar': googleRes.profileObj.imageUrl,
            'accountType': 'google'
        });
    };

    function _onError(err) {
        console.log(err);
    }

    return (
        <>
            <GoogleLogin
                clientId="80366565993-9l5ttp9lv6gpju6nmv93euvtvapbj9r2.apps.googleusercontent.com"
                disabled={props.isFacebookLogging}
                render={renderProps => (
                    <span onClick={renderProps.onClick} disabled={renderProps.disabled}
                        className={props.isLogging?"disabled-google-button":"google-button"}>
                        {!props.isGoogleLogging ? props.title :
                            <img src={config.LOGGING_WAITING_GIF} className="login-loading-gif" />}
                    </span>
                )}
                // buttonText="Login"
                onSuccess={_onGoogleResponse}
                onFailure={_onError}
                cookiePolicy={'single_host_origin'}
            />
            <style jsx>{`
                .google-button{
                    height: 40px;
                    width: 100%;

                    padding: 0px 20px;
                
                    /* border-radius: 5px; */
                    
                    color: white;
                    background-color: #cc3e2f;
                
                    border: none;
                    border-radius: 5px;
                
                    font-size: 18px;
                    font-weight: 700;
                
                    cursor: pointer;
                    
                    display: flex;
                    align-items: center;
                    // justify-content: center;

                    margin: 0 20px;
                    transition: box-shadow 0.2s ease-in-out;
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0);
                }

                .disabled-google-button {
                    height: 40px;
                    width: 100%;

                    padding: 0px 20px;
                
                    /* border-radius: 5px; */
                    
                    color: white;
                    background-color: #cc3e2f;
                
                    border: none;
                    border-radius: 5px;
                
                    font-size: 18px;
                    font-weight: 700;
                
                    cursor: pointer;
                    
                    display: flex;
                    align-items: center;
                    // justify-content: center;

                    margin: 0 20px;

                    pointer-events: none;
                    opacity: 0.4;
                }

                .google-button:hover {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
                
                .login-loading-gif{
                    height: 100%;
                }
            `}</style>
        </>
    );
};

export default GoogleLoginButton;