'use strict';
class PostViewer {
    constructor(detail) {
        this.name = detail.name;
        this.image = detail.image;
        this.source = detail.source;
        this.type = detail.type;
        this.originalLanguage = detail.originalLanguage;
        this.content = detail.content;
    }
};

module.exports = PostViewer;