import fetch from 'isomorphic-unfetch';

import config from '../configs/appConfig';

import { informAnnouncement } from '../actions/informAnnouncement'

export const createPost = async (args) => {
    if (args.systemAccessToken) {
        try {
            return await fetch(`${config.SERVER_URL}/user/create-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': args.systemAccessToken
                },
                body: JSON.stringify({
                    postDetail: args.postDetail
                })
            })
        } catch (error) {
            console.log(error);
            return null;
        }
    } else {
        return null;
    }
};

export const getPostsOfUser = async (args) => {
    if (args.systemAccessToken) {
        try {
            const query = `{postsOfUser(systemAccessToken: "${args.systemAccessToken}", skip: ${args.skip}, limit: ${args.limit}, sortBy: "${args.sortBy}"){posts{_id, createDate, detail { type, originalLanguage, originalName}, numberOfViews, availableLanguages}, numberOfPages}}`;
            return await fetch(`${config.SERVER_URL}/post-graphql?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log(error);
            return null;
        }
    } else {
        return null;
    }
};

export const getPostsByTypeAndLang = async (args) => {
    try {
        const query = `{postByTypeAndLang(skip: ${args.skip}, limit: ${args.limit}, sortBy: "${args.sortBy}", type: ${args.type}, lang: ${args.lang}){posts{_id, createDate, detail {image{id, dataUrl, width, height}, nameByLang}, numberOfViews}, numberOfPages}}`;
        return await fetch(`${config.SERVER_URL}/post-graphql?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getPostsByTypeAndLang2 = async (args) => {
    try {
        const query = `{postByTypeAndLang2(skip: ${args.skip}, limit: ${args.limit}, sortBy: "${args.sortBy}", type: ${args.type}, lang: ${args.lang}){posts{_id, createDate, createdByUser {name},detail {image{id, dataUrl, width, height}, nameByLang, contentByLang}, numberOfViews}, numberOfPages}}`;
        return await fetch(`${config.SERVER_URL}/post-graphql?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getPostDataForTranslating = async (args) => {
    try {
        return await fetch(`${config.SERVER_URL}/post/get-post-content-for-translating/${args.postID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPostByID = async (args) => {
    try {
        return await fetch(`${config.SERVER_URL}/post/get-post-by-id/${args.postID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const viewPost = async (args) => {
    try {
        return await fetch(`${config.SERVER_URL}/post/view/${args.postID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': args.systemAccessToken
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getGoogleTranslate = async (text, targetLang) => {
    console.log("Text", text);
    try {
        return await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyAFZ1TgkTQUY8MECNyAuUB_1SRPXulR08A`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                q: text,
                target: targetLang
            })
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const createTranslationVersionForPost = async (args) => {
    try {
        return await fetch(`${config.SERVER_URL}/user/create-language-version-for-post/${args.postID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': args.systemAccessToken
            },
            body: JSON.stringify({
                dsadsa: "!23312",
                targetLanguage: args.targetLanguage,
                post: args.post,
            })
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};

function change_alias_and_remove_space(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str.split(" ").join("-");
}

export function getPostNameForURL(postName) {
    return change_alias_and_remove_space(postName);
}
