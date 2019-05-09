//JWT
const SECRET = 'nosal_congestion@8894';
const EXPIRED_TIME = 3 * 60 * 60;
const FRESH_TOKEN_EXPIRED_TIME = 3 * 24 * 60 * 60;

module.exports = {
    'secret': SECRET,
    'expired_time': EXPIRED_TIME,
    'refreshTokenSecret': 'aaaabbbb@12345',
    'refreshTokenExpireTime': FRESH_TOKEN_EXPIRED_TIME,
    'server_ip': 'trideptrai.com',
    'database_ip': 'localhost',
    'database_name': 'nosal_congestion'
}