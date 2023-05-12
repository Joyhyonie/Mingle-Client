import { useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion"

function Layout () {

    const [activeIndex, setActiveIndex] = useState();   // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);        // 다크모드 설정을 위한 state

    return (
        <>
            <Header setActiveIndex={setActiveIndex} isDark={isDark} setIsDark={setIsDark}/>
            <div className={ CommonCSS.flex }>
                <NavbarForAdmin activeIndex={activeIndex} setActiveIndex={setActiveIndex} isDark={isDark}/>
                <div className={ CommonCSS.outletSize }>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default Layout;