import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { getGoogleTranslate } from '../../../../apis/postApi';

import config from '../../../../configs/appConfig';
import { i18n, Link, withNamespaces, Router } from '../../../../configs/i18next';

const TranslateTool = (props) => {
    const [googleTranslatedText, setGoogleTranslatedText] = useState(null);

    useEffect(() => {
        async function googleTranslate() {
            const googleTranslateRes = await getGoogleTranslate(props.sentence.text[props.originalLanguage], props.currentLanguage);
            if (googleTranslateRes) {
                const googleTranslateData = await googleTranslateRes.json();
                if (googleTranslateData) {
                    setGoogleTranslateLoading(false);
                    setGoogleTranslatedSuccess(true);
                    setGoogleTranslatedText(googleTranslateData.data.translations[0].translatedText);
                } else {
                    setGoogleTranslateLoading(false);
                    setGoogleTranslatedSuccess(false);
                }
            } else {
                setGoogleTranslateLoading(false);
                setGoogleTranslatedSuccess(false);
            }
        }

        if (!googleTranslatedText) {
            googleTranslate();
        }
    })



    const [googleTranslateLoading, setGoogleTranslateLoading] = useState(true);

    const [googleTranslatedSuccess, setGoogleTranslatedSuccess] = useState(false);

    const [copied, setCopied] = useState(false);

    function copyGoogleTranslated() {

        const range = document.createRange();
        range.selectNode(document.getElementById("translate-tool-google-translated-text"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect

        setCopied(true);
    }

    const [userTranslation, setUserTranslation] = useState(props.sentence.text[props.currentLanguage] ? props.sentence.text[props.currentLanguage] : "");

    function autoGrowTextArea(e) {
        if (userTranslation.trim() !== "") {
            e.target.style.height = (e.target.scrollHeight - 10) + "px";
        } else {
            e.target.style.height = "44px";
        }
    }

    function textOnChange(e) {
        setUserTranslation(e.target.value);
        autoGrowTextArea(e);
    }

    const [translationMess, settranslationMess] = useState(null);

    function translate() {
        if (userTranslation.trim() !== "") {
            console.log(props.type);
            if (props.type === "postName") {
                props.onTranslate(props.sentence.id, props.currentLanguage, userTranslation);
            }
            if (props.type === "itemText") {
                props.onTranslate(props.contentItemID, props.sentence.id, props.currentLanguage, userTranslation);
            }
        } else {
            settranslationMess("cannot-be-empty-string");
        }
    }

    return (
        <>
            <div className="translate-tool-container-1">
                <div className="original-text-container-1">
                    <div className="text-display original-text">
                        {props.sentence.text[props.originalLanguage]}
                    </div>
                    <div className="text-display google-translated-text-container-1">
                        <div className="google-translate-logo-container-1">
                            <div className="google-translate-logo-container-2">
                                <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" className="google-translate-logo" />
                            </div>
                            {googleTranslateLoading ? <div className="google-translate-loading-container-1">
                                <img src={config.LOGGING_WAITING_GIF} className="google-loading" />
                            </div> : !googleTranslatedSuccess ? <div className="google-failed-translate-container-1">
                                <div className="failed-translate-information">{props.t('failed')}</div>
                            </div> : <div className="google-translate-copy-container-1" onClick={() => copyGoogleTranslated()}>
                                        <i className={`far fa-copy copy-icon ${copied ? "copied" : null}`}></i>
                                    </div>}
                        </div>
                        <div className="gtt-container-1">
                            <div className="google-translated-text" id="translate-tool-google-translated-text">
                                {googleTranslatedText}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="translated-text-container-1">
                    <textarea onChange={(e) => textOnChange(e)} value={userTranslation} className="text-display translate-input" />
                </div>
                <div className="translation-action-container-1">
                    {translationMess !== "" ? < div className="translation-message-container-1">
                        <div className="translation-message">
                            {props.t(translationMess)}
                        </div>
                    </div> : null}
                    <div className="translation-action-container-2">

                        <div className="translation-action noselect" onClick={() => translate()}>
                            {props.t('update')}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                

                .translate-tool-container-1{
                    display: flex;
                    flex-direction: column;

                    position: absolute;

                    background-color: #e8e9ea;
                    border-radius: 5px;
                    padding: 20px 20px;

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
                }

                .translate-input{
                    display: flex;
                    flex: 1;
                    
                    outline: none;
                    border: none;

                    font-size: 18px;
                    font: inherit;
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

                @media (max-width: 870px) {
                    .translate-tool-container-1 {
                        min-width: auto;
                        max-width: 400px;
                    }
                }

                @media (max-width: 600px) {
                    .translate-tool-container-1 {
                        min-width: auto;
                        max-width: 300px;
                    }
                }
            `}</style>
        </>
    )
};

TranslateTool.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

TranslateTool.propTypes = {
    t: PropTypes.func.isRequired
};


export default withNamespaces('admin')(TranslateTool);