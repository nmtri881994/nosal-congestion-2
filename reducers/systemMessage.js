import { INFORM, CLOSE_MESSAGE } from '../constant';

const initialState = {
    type: 0,
    content: []
}

export const systemMessage = (state = initialState, action) => {
    switch (action.type) {
        case INFORM:
            return Object.assign({}, state, {
                type: action.message.type,
                content: action.message.content
            });
        case CLOSE_MESSAGE:
            return Object.assign({}, state, {
                type: 0
            });
    }
    return state;
};