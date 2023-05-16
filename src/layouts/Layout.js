import { useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet, useNavigate } from "react-router-dom";
import NavbarForProfessor from '../components/common/NavbarForProfessor';

function Layout () {

    const [activeIndex, setActiveIndex] = useState();   // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);        // 다크모드 설정을 위한 state

    const isAdmin = true; // (임시용) 로그인한 유저가 행정직원 or 교수인지 판별
    const navigate = useNavigate();

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        alert('로그아웃 후 메인으로 이동합니다.');
        navigate('/login', { replace : true });
    }


    return (
        <>
            <Header setActiveIndex={setActiveIndex} isDark={isDark} setIsDark={setIsDark} onClickLogoutHandler={onClickLogoutHandler}/>
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
        </>
    );
}

export default Layout;