// 'use strict';


class PostDetail {
    constructor(detail) {
        this.name = { text: detail.name };
        this.image = detail.image;
        this.source = detail.source;
        this.type = detail.type;
        this.originalLanguage = detail.originalLanguage;
        this.content = detail.content;
    }
};

module.exports = PostDetail;