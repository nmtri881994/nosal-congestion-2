import jsCookie from 'js-cookie';

import { LOGIN, LOGOUT, UPDATE_TOKEN } from '../constant';

import { logout as apiLogout } from '../apis/userAuth'

export const login = (user) => {
    return {
        type: LOGIN,
        user
    };
};

export const logout = (freshToken) => {
    apiLogout(freshToken);
    jsCookie.remove('user');
    return {
        type: LOGOUT
    };
};

export const updateToken = (token) => {
    const cookieUser = JSON.parse(jsCookie.get('user'));
    cookieUser.systemAccessToken = token.systemAccessToken;
    cookieUser.refreshToken = token.refreshToken;

    jsCookie.set('user', cookieUser);

    return {
        type: UPDATE_TOKEN,
        token
    }
};