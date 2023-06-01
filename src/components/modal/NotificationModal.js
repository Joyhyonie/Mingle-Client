import notiCSS from "../../css/Notification.module.css";
import { motion } from "framer-motion";
import NotificationItem from "../items/NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { callNotificationListAPI, callNotificationRemoveAllAPI } from "../../apis/NotificationAPICalls";

function NotificationModal ({isDark}) {

    const dispatch = useDispatch();
    const { notifications, remove, removeAll } = useSelector(state => state.NotificationReducer);

    useEffect(
        () => {
            /* 현재 로그인한 유저의 알림 목록 조회 API */
            dispatch(callNotificationListAPI());

            if(remove?.status === 200) {
                toast.success("해당 알림이 삭제되었습니다 :)")
            } else if(removeAll?.status === 200) {
                toast.success("알림이 모두 삭제되었습니다 :)")
            }

        },[remove, removeAll]
    );

    /* '전체 삭제' 클릭 시, 현재 존재하는 알림들을 모두 삭제하는 API 호출하는 함수 */
    const deleteAllHandler = () => {

        dispatch(callNotificationRemoveAllAPI())
        
    }

    return (
        <motion.div className={ isDark ? notiCSS.darkNotiModal : notiCSS.whiteNotiModal }
             animate={{ backgroundColor: isDark ? "#343434" : "#FFF" }}
             transition={{ duration: 0.5 }}
        >
            <div >
                <div className={ notiCSS.notiHeader }>
                    <p style={{color: isDark ? "white" : "#666666"}}>알림 <span>{notifications && notifications.length}</span>건</p>
                    <button
                        style={{backgroundColor: isDark ? "#666666" : "#343434"}}
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