import PropTypes from 'prop-types';

import { i18n, Link, withNamespaces } from '../../../../configs/i18next';
import { useState, useEffect } from 'react';

import { getGoogleTranslate } from '../../../../apis/postApi'; 

const TranslatTool2 = (props) => {
    const [googleTranslatedText, setGoogleTranslatedText] = useState(null);

    useEffect(() => {
        async function googleTranslate() {
            const googleTranslateRes = await getGoogleTranslate(props.sentence.text[props.originalLanguage], props.currentLanguage);
            if (googleTranslateRes) {
                const googleTranslateData = await googleTranslateRes.json();
                if (googleTranslateData) {
                    // setGoogleTranslateLoading(false);
                    // setGoogleTranslatedSuccess(true);
                    setGoogleTranslatedText(googleTranslateData.data.translations[0].translatedText);
                } else {
                    // setGoogleTranslateLoading(false);
                    // setGoogleTranslatedSuccess(false);
                }
            } else {
                // setGoogleTranslateLoading(false);
                // setGoogleTranslatedSuccess(false);
            }
        }

        if (!googleTranslatedText) {
            googleTranslate();
        }
    })

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
                            {/* {googleTranslateLoading ? <div className="google-translate-loading-container-1">
                                <img src={config.LOGGING_WAITING_GIF} className="google-loading" />
                            </div> : null} */}
                        </div>
                        <div className="gtt-container-1">
                            <div className="google-translated-text">
                                {googleTranslatedText}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="translated-text-container-1">
                    <textarea onChange={(e) => textOnChange(e)} className="text-display translate-input" placeholder={
                        props.sentence.text[props.currentLanguage]
                    } />
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
            `}</style>
        </>
    )
};

TranslatTool2.getInitialProps = async function () {
    return {
        namespacesRequired: ['admin']
    }
};

TranslatTool2.propTypes = {
    t: PropTypes.func.isRequired
}

export default withNamespaces('admin')(TranslatTool2);