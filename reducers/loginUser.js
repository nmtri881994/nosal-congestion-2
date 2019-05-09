import { LOGIN, LOGOUT, UPDATE_TOKEN } from '../constant';

const initialState = {
    systemAccessToken: "",
    refreshToken: "",
    userInfo: {
        firstName: "",
        avatar: ""
    }
};

export const loginUser = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, action.user ? action.user : initialState);
        case LOGOUT:
            return Object.assign({}, state, initialState);
        case UPDATE_TOKEN:
            return Object.assign({}, state, {
                systemAccessToken: action.token.systemAccessToken,
                refreshToken: action.token.refreshToken
            })
    }
    return state;
}