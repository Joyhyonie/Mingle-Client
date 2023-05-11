import { useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion"

function Layout () {

    /* 활성화된 화면을 컨트롤하기 위한 state */
    const [activeIndex, setActiveIndex] = useState();

    return (
        <>
            <Header setActiveIndex={setActiveIndex}/>
            <div className={ CommonCSS.flex }>
                <NavbarForAdmin activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                <div className={ CommonCSS.outletSize }>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default Layout;