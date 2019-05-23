'use strict';

const uniqid = require('uniqid');

class PostDetailItemText {
    constructor(text, language) {
        this.id = uniqid();
        this.text = {};
        Object.defineProperty(this.text, language, {
            value: {
                linked: false,
                text
            },
            writable: true,
            enumerable: true
        })
    }
};

module.exports = PostDetailItemText;