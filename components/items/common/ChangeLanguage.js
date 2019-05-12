import { i18n } from '../../../configs/i18next';
import { useState, useEffect } from 'react';

import LanguageSelect from './LanguageSelect';

import config from '../../../configs/appConfig';

const ChangeLanguage = (props) => {
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        setLanguage(config.LANGUAGE_OPTIONS.find(op => op.value === i18n.language));
    });

    function _onChangeLanguage(selectedLanguage) {
        i18n.changeLanguage(selectedLanguage.value);
        setLanguage(selectedLanguage);
    }

    return (
        <>
            <div className="change-language-container-1">
                <LanguageSelect langOptions={config.LANGUAGE_OPTIONS} onChangeAction={_onChangeLanguage} selectedLanguage={language} />
                {/* <select defaultValue={i18n.language} onChange={(e) => {
                    if (language !== e.target.value) {
                        setLanguage(e.target.value);
                        i18n.changeLanguage(e.target.value);
                    }
                }}>
                    <option value="en">
                        English
                    </option>
                    <option value="vn">
                        Tiếng Việt
                    </option>
                </select> */}
            </div>
            <style jsx>{`
                .change-language-container-1 {
                    // display: flex;
                    flex: 1;
                }
            `}</style>
        </>
    )
};

export default ChangeLanguage;