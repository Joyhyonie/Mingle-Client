import jwt_decode from "jwt-decode"

export function decodeJwt() {
    const accessToken = window.localStorage.getItem('accessToken');

    return accessToken && jwt_decode(accessToken);
}

/* 로그인 했는지 확인 */
export function isLogin() {
    const token = decodeJwt();
    console.log('token : ', token);
    return !(token === undefined || token === null || token.exp * 1000 < Date.now());
}

/* 관리자인지 확인 */
export function isAdmin() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'ROLE_ADMIN');
}

/* 교수인지 확인 */
export function isProf() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'ROLE_PROF');
}

/* 로그인 된 유저의 id 가져오기 */
export function getMemberId() {
    const token = decodeJwt();
    return (token && token.sub); // token.sub : 로그인 된 유저의 id
}