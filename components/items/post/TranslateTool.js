import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

// import { getGoogleTranslate } from '../../../../apis/postApi';

// import config from '../../../../configs/appConfig';
import { i18n, Link, withNamespaces, Router } from '../../../configs/i18next';

const TranslateTool = (props) => {


    return (
        <>
            <div className="translate-tool-container-1">
                {/* <div className="original-text-container-1"> */}
                <div className="title">
                    {props.t('original')}
                </div>
                <div className="text-display original-text">
                    {props.originalText}
                </div>
                {/* </div> */}
            </div>
            <style jsx>{`
                .translate-tool-container-1{
                    display: flex;
                    flex-direction: column;

                    position: absolute;

                    background-color: #e8e9ea;
                    border-radius: 5px;
                    padding: 10px 10px;

                    transform: translateY(-100%);
                    top: -10px;
                    z-index: 1;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    
                    font-size: 18px;
                    font-weight: 500;

                    min-width: 500px;
                }

                .original-text-container-1{
                    display: flex;
                    flex-direction: column;

                    margin-left: -10px;
                    margin-right: -10px;


                    padding: 10px 10px;

                    background-color: #ef9a9a;

                    border-radius: 5px;
                }

                .text-display {
                    padding: 5px 10px;

                    border-radius: 5px;
                }

                .translated-text-container-1{
                    display: flex;
                    margin-top: 10px;
                }

                .google-translated-text-container-1{
                    display: flex;
                    flex-direction: column;

                    margin-top: 10px;
                    background-color: white;
                }

                .original-text{
                    display: flex;
                    background-color: white;

                    margin-top: 5px;
                }

                .translate-input{
                    display: flex;
                    flex: 1;
                    
                    outline: none;
                    border: none;

                    font-size: 18px;
                }

                .google-translate-logo-container-1{
                    display: flex;
                }
                
                .google-translate-logo-container-2{
                    display: flex;
                    width: 60px;
                }

                .google-translate-loading-container-1{
                    display: flex;
                    width: 30px;

                    margin-left: 10px;
                }

                .google-translate-logo{
                    width: 100%;
                }

                .google-translated-text-container-1{
                    display: flex;
                }

                .google-translated-text{
                    font-size: 18px;
                }

                .google-loading{
                    height: 30px;
                }

                .google-failed-translate-container-1{
                    display: flex;
                    margin-left: 10px;
                }

                .failed-translate-information{
                    display: flex;

                    background-color: #ef5350;
                    color: white;

                    border-radius: 5px;
                    padding: 5px 10px;
                }

                .google-translate-copy-container-1{
                    display: flex;
                    flex: 1;

                    justify-content: flex-end;
                }

                .copy-icon{
                    color: #e8e9ea;
                }

                .copied{
                    color: #2196F3;
                }

                .translation-action-container-1{
                    display: flex;
                    flex-direction: column;
                    
                    margin-top: 10px;
                    
                }
                
                .translation-action-container-2{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;

                    margin-top: 5px;
                }
                
                .translation-action {
                    display: flex;
                    padding: 5px 10px;
                    
                    border-radius: 5px;
                    
                    background-color: #2196F3;
                    color: white;
                    
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    
                    transition: background-color 0.2s;
                    cursor:pointer;
                }

                .translation-action:hover {
                    background-color: #0b7dda;
                }

                .translation-message-container-1 {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }

                .translation-message {
                    display: flex;
                    color: red;
                }

                .title {
                    display: flex;
                    padding-left: 10px;
                }

                @media (max-width: 870px) {
                    .translate-tool-container-1 {
                        min-width: auto;
                        width: 400px;
                    }
                }

                @media (max-width: 600px) {
                    .translate-tool-container-1 {
                        min-width: auto;
                        width: 300px;
                    }
                }
            `}</style>
        </>
    )
};

TranslateTool.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

TranslateTool.propTypes = {
    t: PropTypes.func.isRequired
};


export default withNamespaces('index')(TranslateTool);