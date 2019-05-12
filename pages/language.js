import PropTypes from 'prop-types';
import { withRouter } from 'next/router'

import { i18n, Link, withNamespaces, Router } from '../configs/i18next';

import config from '../configs/appConfig';

const Language = (props) => {

    function _onChangeLanguage(selectedLanguage) {
        props.i18n.changeLanguage(selectedLanguage);
        Router.push(props.router.query.return ? props.router.query.return : "/");
    }

    return (
        <>
            <div className="language-container-1">
                <div className="language-container-2">
                    <div className="language-title">
                        Languages
                    </div>
                    <div className="language-container-3">
                        {config.LANGUAGE_OPTIONS.map(lang => <div onClick={() => _onChangeLanguage(lang.value)} key={lang.value} className="array-item hover-blue cursor-pointer noselect">
                            {lang.label}
                        </div>
                        )}

                    </div>
                </div>
            </div>
            <style jsx>{`
                .language-container-1 {
                    display: flex;
                    justify-content: center;

                }

                .language-container-2 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    width: 900px;
                }

                .language-title{
                    border-bottom: 1px solid #bcbfc2;
                    padding: 10px 20px;
                }

                .language-container-3 {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    
                }
            `}</style>
        </>
    )
};

Language.getInitialProps = async function () {
    return {
        namespacesRequired: ['index']
    }
};

Language.propTypes = {
    t: PropTypes.func.isRequired
};

export default withNamespaces('index')(withRouter(Language));