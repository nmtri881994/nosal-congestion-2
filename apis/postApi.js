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

export const getGoogleTranslate = async (text, targetLang) => {
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
}
