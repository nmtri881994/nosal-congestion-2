const LOGGING_WAITING_GIF = "http://choinhanh.vn/games/thoi-trang-ladybug/images/_preloader.gif";
const SERVER_URL = "https://192.168.9.107/server";

const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' }
];

const POST_ITEM_CSS = `.post-name{
    font-size: 30px;
    font-weight: 700;
}

.h1 {
    font-size: 24px;
    font-weight: 700;
}

.h2 {
    font-size: 22px;
    font-weight: 700;
}

.h3 {
    font-size: 20px;
    font-weight: 700;
}

.paragraph{
    font-size: 18px;
}

.link{
    text-decoration: underline !important;

    color: #2962ff !important;

    font-size: 18px;
}`;

module.exports = {
    LOGGING_WAITING_GIF,
    SERVER_URL,
    LANGUAGE_OPTIONS,
    POST_ITEM_CSS
};