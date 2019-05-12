import Select from 'react-select';
import _ from 'lodash';

import config from '../../../configs/appConfig';

const LanguageSelect = (props) => {
    return (
        <Select
            // styles={customStyles}
            styles={{
                // ...otherProps.styles,
                singleValue: styles => _.omit(styles, ['maxWidth', 'position', 'top', 'transform']),
            }}
            value={props.selectedLanguage}
            onChange={(selectedOption) => props.onChangeAction ? props.onChangeAction(selectedOption) : null}
            options={props.langOptions}
            isSearchable={true}
        />
    );
}

export default LanguageSelect;