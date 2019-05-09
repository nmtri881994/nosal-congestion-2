import validator from 'validator';

export const textRequired = (value) => {
    if (!value || !value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return 'required';
    }
};

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const objectRequired = (value) => {
    if (!value || isEmpty(value)) {
        return 'required';
    }
};

export const arrayRequired = (value) => {
    if (!value || value.length === 0) {
        return 'required';
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return 'not-valid-eamil';
    }
};

export const lengthCheck = (value, maxLength) => {
    if (value.toString().trim().length > maxLength) {
        return 'exceed-max-length';
    }
};

export const selectMandatory = (value) => {
    const selected = value.filter(item => item.selected === true);
    if (selected.length === 0) {
        return 'required';
    }
}