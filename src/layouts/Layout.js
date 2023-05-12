import { useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion"
import NavbarForProfessor from '../components/common/NavbarForProfessor';

function Layout () {

    const [activeIndex, setActiveIndex] = useState();   // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);        // 다크모드 설정을 위한 state

    const isAdmin = false; // (임시용) 로그인한 유저가 행정직원 or 교수인지 판별

    return (
        <>
            <Header setActiveIndex={setActiveIndex} isDark={isDark} setIsDark={setIsDark}/>
            <div className={ CommonCSS.flex }>
                { isAdmin ? 
                <NavbarForAdmin activeIndex={activeIndex} setActiveIndex={setActiveIndex} isDark={isDark}/>
                : <NavbarForProfessor activeIndex={activeIndex} setActiveIndex={setActiveIndex} isDark={isDark}/>
                }
                <div className={ CommonCSS.outletSize }>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default Layout;