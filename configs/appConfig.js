const LOGGING_WAITING_GIF = "/public/images/_preloader.gif";
const SERVER_URL = "https://nasal-congestion.tk/server";

const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' }
];

const SCRIPT_LANGUAGE_OPTIONS = [
    { value: 'html', label: 'HTML' },
    { value: 'js', label: 'Javascript' },
    { value: 'css', label: 'CSS' },
    { value: 'java', label: 'Java' },
    { value: 'jsx', label: 'React JSX' }
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
    POST_ITEM_CSS,
    SCRIPT_LANGUAGE_OPTIONS
};