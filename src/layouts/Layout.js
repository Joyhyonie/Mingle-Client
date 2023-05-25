import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import NavbarForAdmin from '../components/common/NavbarForAdmin';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet } from "react-router-dom";
import NavbarForProfessor from '../components/common/NavbarForProfessor';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { callGetEmployeeAPI } from '../apis/EmployeeAPICalls';

function Layout () {

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.EmployeeReducer);
    const [activeIndex, setActiveIndex] = useState();   // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);        // 다크모드 설정을 위한 state

    useEffect(
        () => {
            dispatch(callGetEmployeeAPI());
        },[]
    );

    // SSE 구독 후 클라이언트별로 알림 받기
    useEffect(
        () => {

            const url = "http://localhost:8001";
            const token = window.localStorage.getItem('accessToken');

            if (token != null) {
                const eventSource = new EventSource(`${url}/noti/${token}`);
                console.log("서버로 이벤트 구독 완🥳")

                eventSource.addEventListener("receivedMsg", (e) => {
                    const data = JSON.parse(e.data);
                    const senderImg = data.sender.empProfile;
                    const senderName = data.sender.empName;
                    const msgContent = data.msgContent;
                    toast.custom((senderImg, senderName, msgContent) => customMessageNoti());
                });
          
                eventSource.addEventListener("error", (e) => {
                    eventSource.close();
                });
            }

        },[]
    );

    /* 실시간 쪽지 알림을 커스텀하기 위한 함수 */
    const customMessageNoti = () => {

        return <></>
    }

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