import { useEffect, useState } from 'react';
import CommonCSS from '../../css/common/Common.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import MessageModalLayout from '../../layouts/MessageModalLayout';
import NotificationModal from '../modal/NotificationModal';
import LogoutModal from '../modal/LogoutModal';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function Header ({ setActiveIndex, isDark, setIsDark, logoutHandler }) {

    /*  setActiveIndex : 로고 및 마이페이지 아이콘을 클릭 시, Nav바 활성화 취소 */

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { employee } = useSelector(state => state.EmployeeReducer);

    const [mpgClicked, setMpgClicked] = useState(false);
    const [notiClicked, setNotiClicked] = useState(false);
    const [msgClicked, setMsgClicked] = useState(false);
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);  // 알림 모달 컨트롤 state
    const [messageModal, setMessageModal] = useState(false);            // 쪽지 모달 컨트롤 state
    const [logoutModal, setLogoutModal] = useState(false);              // 로그아웃 모달 컨트롤 state
    
    /* 다크모드/라이트모드를 제어하기 위한 이벤트 함수 */
    const darkModeHandler = () => {
        setIsDark(!isDark);
        if(isDark) {
            toast("LIGHT MODE",{icon: "🌄"})
        } else {
            toast("DARK MODE",{icon: "🌠"})
        }
    }

    /* 쪽지 모달창 핸들러 함수 */
    const messageModalHandler = () => setMessageModal(!messageModal);

    /* 알림 모달창 핸들러 함수 */
    const notificationModalHandler = () => setNotificationModal(!notificationModal);

    /* 로그아웃 모달창 핸들러 함수 */
    const logoutModalHandler = () => setLogoutModal(!logoutModal);

    /* mypage에서 다른 페이지로 이동되면 mypage의 아이콘을 다시 기본 아이콘으로 돌려놓기 위한 useEffect */
    useEffect(() => {
        if (location.pathname === "/mypage/profile") { // pathname이 mypage일 때만 true
            setMpgClicked(true);
        } else {
            setMpgClicked(false);
        }
    }, [location]);

    return (
        <>
            {/* 쪽지 모달창 */}
            <div className={ CommonCSS.msgModalDiv }>
                <motion.div drag dragConstraints={{ left: 0, right: 1200, top: 0, bottom: 200}}>
                    { messageModal ? 
                        (<MessageModalLayout setMessageModal={setMessageModal} setMsgClicked={setMsgClicked}/>) : null
                    }
                </motion.div>
            </div>
            
            {/* 알림 모달창 */}
            <div className={ CommonCSS.notiModalDiv }>
                <div>
                    { notificationModal ?
                        (<NotificationModal isDark={isDark}/>) : null
                    }
                </div>
            </div>

            {/* 로그아웃 모달창 */}
            <div className={ CommonCSS.logoutModalDiv }>
                { logoutModal ?
                    (<LogoutModal logoutHandler={logoutHandler} setLogoutModal={setLogoutModal} setLogoutClicked={setLogoutClicked}/>) : null
                }
            </div>

            <motion.div className={ isDark ? CommonCSS.headerBoxDark : CommonCSS.headerBoxLight }
                        animate={{ backgroundColor: isDark ? "#4D4D4D" : "#FFF" }}
                        transition={{ duration: 0.5 }}
            >
                <p
                    className={ CommonCSS.logo }
                    onClick={ () => { 
                        setActiveIndex('');
                        navigate('/'); 
                    } }
                >
                    <span>M</span>ingle
                </p>
                <p className={ CommonCSS.hello }><span>{employee && employee.empName}</span>님 안녕하세요 :)</p>
                <div className={ CommonCSS.iconBox }>
                    {mpgClicked ? (
                        <motion.img
                            src="/images/mypage-hover.png"
                            whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <img
                            src="/images/mypage.png"
                            onClick={() => {
                                setActiveIndex('');
                                navigate('/mypage'); 
                                setMpgClicked(true);
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    )}

                    {notiClicked ? (
                        <motion.img
                            src="/images/notification-hover.png"
                            onClick={() => {
                                setNotiClicked(false);
                                setNotificationModal(!notificationModal)
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <img
                            src="/images/notification.png"
                            onClick={() => {
                                setNotiClicked(true);
                                notificationModalHandler();
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    )}
                    
                    {msgClicked ? (
                        <motion.img
                            src="/images/message-hover.png"
                            onClick={() => {
                                setMsgClicked(false);
                                setMessageModal(false);
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <img
                            src="/images/message.png"
                            onClick={() => {
                                setMsgClicked(true);
                                messageModalHandler();
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    )}

                    { isDark ? (
                        <motion.img
                        src={"/images/darkmode-hover.png"}
                        onClick={darkModeHandler}
                        whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <motion.img
                        src={isHovered ? "/images/darkmode-hover.png" : "/images/darkmode.png"}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={darkModeHandler}
                        whileHover={{ scale: 1.05 }}
                        />
                    )}

                    {logoutClicked ? (
                        <motion.img
                            src="/images/logout-hover.png"
                            onClick={() => {
                                setLogoutClicked(false);
                                setLogoutModal(false);
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <img
                            src="/images/logout.png"
                            onClick={() => {
                                setLogoutClicked(true);
                                logoutModalHandler();
                            }}
                            whileHover={{ scale: 1.05 }}
                        />
                    )}
                </div>
            </motion.div>
        </>
    );
}

export default Header;