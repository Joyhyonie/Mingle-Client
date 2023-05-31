import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import ToastCSS from '../css/common/Toast.module.css';
import { Outlet } from "react-router-dom";
import NavbarForProfessor from '../components/common/NavbarForProfessor';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { callGetEmployeeAPI } from '../apis/EmployeeAPICalls';

function Layout () {

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.EmployeeReducer);
    const [activeIndex, setActiveIndex] = useState();                   // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);                        // 다크모드 설정을 위한 state
    

    useEffect(
        () => {
            dispatch(callGetEmployeeAPI());
        },[]
    );

    // 현재 로그인 한 유저가 교수 or 행정직원인지에 따라 Navbar 변경하기 위한 변수
    const isAdmin = employee && employee.empId.startsWith('AD');

    // 로그아웃
    const logoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        toast.success('로그아웃 성공 !');
        window.location.href = '/login';
    }

    return (
        <div>
            <Header setActiveIndex={setActiveIndex} 
                    isDark={isDark} 
                    setIsDark={setIsDark} 
                    logoutHandler={logoutHandler} 
            />
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