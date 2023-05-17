import notiCSS from "../../css/Notification.module.css";
import { motion } from "framer-motion";
import NotificationItem from "../items/NotificationItem";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function NotificationModal ({isDark}) {

    const dispatch = useDispatch();

    /* (임시용) */
    const notifications = [{ notiCode: 12345, notiTypeCode: 1, notiTitle: '새로운 공지사항이 등록되었습니다.', notiContent: '[과학영재교육원] 주말교육 조교 모집', notiDate: '2023-05-17 15:59:21'}, 
                           { notiCode: 12346, notiTypeCode: 2, notiTitle: '오늘은 해당 학사일정의 시작일입니다.', notiContent: '2023학년도 1학기 성적열람기간', notiDate: '2023-05-17 12:33:34'}, 
                           { notiCode: 12347, notiTypeCode: 3, notiTitle: '오늘은 해당 학사일정의 종료일입니다.', notiContent: '2023학년도 1학기 강의 평가 실시', notiDate: '2023-05-16 17:40:71'}, 
                           { notiCode: 12348, notiTypeCode: 1, notiTitle: '새로운 공지사항이 등록되었습니다.', notiContent: '[학습법] 2023학년도 단과대학별 신입생을 위한 선배 특강 안내', notiDate: '2023-05-15 14:40:21'}
    ]

    // const notifications = []

    useEffect(
        () => {
            /* 현재 로그인한 유저의 알림 목록 조회 API */
            // dispatch(callGetNotiAPI());

        },[]
    );

    /* '전체 삭제' 클릭 시, 현재 존재하는 알림들의 Code들을 삭제된 알림에 추가 */
    const deleteAllHandler = () => {
        // 미리 조회해온 알림들의 notiCode들을 아래 API호출 매개변수에 전달하는 로직 필요

        // dispatch(callDeleteAllNotiAPI())

        // status === 200일 시,
        toast.success("알림이 모두 삭제되었습니다") // 알림창이 뜨면서 전체 삭제된 알림창을 렌더링 하고싶은데 useEffect에서 어떻게 돌릴까?
        
    }

    return (
        <motion.div className={ isDark ? notiCSS.darkNotiModal : notiCSS.whiteNotiModal }
             animate={{ backgroundColor: isDark ? "#4D4D4D" : "#FFF" }}
             transition={{ duration: 0.5 }}
        >
            <div >
                <div className={ notiCSS.notiHeader }>
                    <p style={{color: isDark ? "white" : "#666666"}}>알림 5건</p> {/* 조회해온 각 알림 객체의 길이를 Count할까? */}
                    <button
                        onClick={ deleteAllHandler }
                    >
                        전체 삭제
                    </button>
                </div>
                <div className={ notiCSS.notiBox }>
                {notifications && notifications.length > 0 ? (
                    notifications.map(noti => <NotificationItem noti={noti} />)
                ) : (
                    <p className={ notiCSS.noneNoti } style={{color: isDark ? "white" : "#666666"}}>표시할 알림이 없습니다 😶</p>
                )}
                </div>
            </div>
        </motion.div>
    );
}

export default NotificationModal;