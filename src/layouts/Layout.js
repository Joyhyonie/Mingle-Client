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
    const [activeIndex, setActiveIndex] = useState();           // 활성화된 화면을 컨트롤하기 위한 state
    const [isDark, setIsDark] = useState(false);                // 다크모드 설정을 위한 state
    const [updateNoti, setUpdateNoti] = useState('');           // 실시간 알림에 따른 알림 갯수 렌더링을 위한 state
    const [updateMsg, setUpdateMsg] = useState('');             // 실시간 쪽지에 따른 쪽지 갯수 렌더링을 위한 state
    const [messageModal, setMessageModal] = useState(false);    // 쪽지 모달 컨트롤 state
    

    useEffect(
        () => {
            dispatch(callGetEmployeeAPI());
        },[]
    );

    // 클라이언트의 SSE 이벤트 구독!
    useEffect(
        () => {
            
            const url = "http://localhost:8001";
            const token = window.localStorage.getItem('accessToken');

            if (token != null) {
                const eventSource = new EventSource(`${url}/noti?token=${token}`);
                console.log("서버로 이벤트 구독 완🥳")

                eventSource.addEventListener("receivedMsg", (e) => {
                    const data = JSON.parse(e.data);
                    const senderImg = data.sender.empProfile;
                    const senderName = data.sender.empName;
                    const msgContent = data.msgContent;
                    customMessageNoti(senderImg, senderName, msgContent);
                    setUpdateMsg(data);
                });

                eventSource.addEventListener("commonNoti", (e) => {
                    const data = JSON.parse(e.data);
                    const notiTitle = data.notiType.notiTitle;
                    const notiContent = data.notiContent;
                    customCommonNoti(notiTitle, notiContent);
                    setUpdateNoti(data);
                })

                eventSource.addEventListener("error", (e) => {
                    eventSource.close();
                    console.error("SSE 연결 오류 원인 => ", e);
                    console.log("🔥🔥🔥 구독 ... 취소 ... 🔥🔥🔥");
                });
            }

        },[]
    );

    /* 실시간 쪽지 알림 커스텀 함수 */
    const customMessageNoti = (senderImg, senderName, msgContent) => {

        toast.custom((t) => (
            <div
                onClick={ () => setMessageModal(true) }
                style={{
                    
                    cursor: "pointer",
                    opacity: t.visible ? 1 : 0,
                    transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
                    transform: t.visible ? "translateY(0)" : "translateY(-50%)",
                }}
            >
                <div className={ ToastCSS.msgNotiBox }>
                    <div className={ ToastCSS.msgContentBox }>
                        <img src={senderImg}/>
                        <div>
                            <sub><span>{senderName}</span>님의 쪽지가 도착했습니다 :)</sub>
                            <p>{msgContent ? (msgContent.length > 22 ? msgContent.slice(0, 22) + "..." : msgContent) : ""}</p>
                        </div>
                    </div>
                    <div className={ ToastCSS.closeBox } onClick={ (e) => {toast.dismiss(t.id); e.stopPropagation()}}>
                        <p>close</p>
                    </div>
                </div>
            </div>
            ),
            { duration: 5000 }
        );
    }

    /* 실시간 학사일정, 공지사항 알림 커스텀 함수  */
    const customCommonNoti = (notiTitle, notiContent) => {

        toast.custom((t) => (
            <div
                style={{
                    opacity: t.visible ? 1 : 0,
                    transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
                    transform: t.visible ? "translateY(0)" : "translateY(-50%)",
                }}
            >
                <div className={ ToastCSS.commonNotiBox }>
                    <div className={ ToastCSS.commonContentBox }>
                        <div>
                            <sub>{notiTitle}</sub>
                            <p>{notiContent ? (notiContent.length > 24 ? notiContent.slice(0, 24) + "..." : notiContent) : ""}</p>
                        </div>
                    </div>
                    <div className={ ToastCSS.closeBox } onClick={ () => toast.dismiss(t.id)}>
                        <p>close</p>
                    </div>
                </div>
            </div>
            ),
            { duration: 5000 }
        );

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
            <Header setActiveIndex={setActiveIndex} 
                    isDark={isDark} 
                    setIsDark={setIsDark} 
                    logoutHandler={logoutHandler} 
                    updateNoti={updateNoti}
                    updateMsg={updateMsg}
                    messageModal={messageModal}
                    setMessageModal={setMessageModal}
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