import { Navigate } from "react-router-dom";
import { isAdmin, isLogin } from "../../utils/TokenUtils";


/* ex : 로그인이 된 상태에서 url로 회원가입이나 로그인 페이지로 이동 되지 않도록 처리하기 위한 함수 */
function ProtectedRoute({ loginCheck, authCheck, children }) {

    /* children : <ProtectedRoute>children</ProtectedRoute> */

    if(authCheck) {
        /* 권한 없이 접근 불가 기능(ex. 상품 등록, 수정) -> props로 authCheck 값을 true로 전달 */
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if(loginCheck) {
        /* 로그인 해야만 볼 수 있는 기능 (ex. 마이페이지) -> props로 loginCheck 값을 true로 전달 */
        return isLogin() ? children : <Navigate to="/login"/> // 로그인이 되어있을 때만 children으로 등록된 컴포넌트로 이동, 아니면 로그인 페이지로 이동
    } else {
        /* 로그인 시 접근 불가 기능 (ex. 로그인, 회원가입) -> props로 loginCheck 값을 false로 전달 */
        return !isLogin() ? children : <Navigate to="/"/> // 로그인이 안되어있을 때만 로그인, 회원가입 페이지로 이동
    }
}

export default ProtectedRoute;