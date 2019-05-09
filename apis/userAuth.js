import fetch from 'isomorphic-unfetch';
import { Router } from '../configs/i18next';


import config from '../configs/appConfig';

import { logout as actionLogout, updateToken } from '../actions/login';

export const login = async (user) => {
    try {
        return fetch(`${config.SERVER_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

export const getNewToken = async (refreshToken) => {
    if (refreshToken) {
        try {
            return await fetch(`${config.SERVER_URL}/auth/get-new-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken
                })
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    } else {
        return null;
    }
}

export const retryRequest = async (api, argus, refreshToken, dispatch) => {

    if (refreshToken && typeof (refreshToken) === 'string' && refreshToken.length !== 0) {
        try {
            const newTokenRes = await getNewToken(refreshToken);
            if (newTokenRes) {
                const newToken = await newTokenRes.json();
                if (newTokenRes.status === 201) {
                    dispatch(updateToken({
                        systemAccessToken: newToken.systemAccessToken,
                        refreshToken: newToken.refreshToken
                    }));
                    return api(argus);
                } else {
                    dispatch(actionLogout(refreshToken));
                    await Router.push(`/login?previous=${argus.originalUrl}`);
                    return null;
                }
            } else {
                dispatch(actionLogout(freshToken));
                await Router.push(`/login?previous=${argus.originalUrl}`);
                return null;
            }

        }
        catch (error) {
            console.log(error);
            return null;
        }
    } else {
        await Router.push(`/login?previous=${argus.originalUrl}`);
        return null;
    }
};

export const logout = async (refreshToken) => {
    try {
        return await fetch(`${config.SERVER_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken
            })
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const testToken = async (agrus) => {
    if (agrus.systemAccessToken) {
        try {
            return await fetch(`${config.SERVER_URL}/auth/test`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': agrus.systemAccessToken
                }
            });
        } catch (error) {
            console.log(error);
            Router.push(`/login?previous=${argus.originalUrl}`);
            return null;
        }
    } else {
        Router.push(`/login`);
        return null;
    }

}