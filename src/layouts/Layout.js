import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet, useNavigate } from "react-router-dom";
import NavbarForProfessor from '../components/common/NavbarForProfessor';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { callGetEmployeeAPI } from '../apis/EmployeeAPICalls';

function Layout () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState();   // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);        // 다크모드 설정을 위한 state

    const isAdmin = true; // (임시용) 로그인한 유저가 행정직원 or 교수인지 판별

    /* 첫 로그인 시, empCode를 찾지 못 해 발생하는 모든 오류를 해결하기 위해 현재 로그인한 유저 조회 API 호출을 Layout에서 실행 */
    useEffect(
        () => {
            /* 현재 로그인한 유저 조회 API 호출 */
            dispatch(callGetEmployeeAPI());
        },[]
    );

    const logoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        toast.success('로그아웃 성공 !');
        // navigate('/login', { replace : true });
        window.location.href = '/login';
    }


    return (
        <div>
            <Header setActiveIndex={setActiveIndex} isDark={isDark} setIsDark={setIsDark} logoutHandler={logoutHandler}/>
            <div className={ CommonCSS.flex }>
                <div className={ CommonCSS.navbarCustom }>
                { isAdmin ? 
                <NavbarForAdmin activeIndex={activeIndex} setActiveIndex={setActiveIndex} isDark={isDark}/>
                : <NavbarForProfessor activeIndex={activeIndex} setActiveIndex={setActiveIndex} isDark={isDark}/>
                }
                </div>
                <div className={ CommonCSS.outletCustom }>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Layout;