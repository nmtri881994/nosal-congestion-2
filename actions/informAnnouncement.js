import { INFORM, CLOSE_MESSAGE } from '../constant';

export const informAnnouncement = (message) => {
    return {
        type: INFORM,
        message
    };
};

export const closeMessage = () => {
    return {
        type: CLOSE_MESSAGE
    }
}