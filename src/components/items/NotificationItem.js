import { useDispatch } from "react-redux";
import notiCSS from "../../css/Notification.module.css";
import dayjs from 'dayjs';
import { callNotificationRemoveAPI } from "../../apis/NotificationAPICalls";

function NotificationItem ({noti}) {

    const dispatch = useDispatch();
    
    /* 알림 생성 시각으로 알림이 언제 도착했는지 format하여 반환하는 함수 (day.js사용) */
    const dateFormatHandler = (notiDate) => {

        dayjs.locale('ko'); // 한국어 설정

        const now = dayjs();
        const date = dayjs(notiDate);

        const diffMinutes = now.diff(date, 'minute');
        const diffHours = now.diff(date, 'hour');
        const diffDays = now.diff(date, 'day');

        if (diffMinutes === 0) {
            return '지금'
        } else if (diffDays === 0 && diffHours === 0) {
            return `${diffMinutes}분 전`
        } else if (diffDays === 0) {
            return `${diffHours}시간 전`
        } else {
            return `${diffDays}일 전`
        }

    }

    /* '삭제'클릭 시, 해당 알림 삭제  */
    const deleteHandler = (notiCode) => {
        dispatch(callNotificationRemoveAPI(notiCode));
    }
    

    return (
        <div className={ notiCSS.notiItemBox }>
            <div className={ notiCSS.notiItemHeader }>
                <h4>{noti.notiType.notiTypeCode === 40001 ? `💬 ${noti.notiType.notiTitle}` 
                    : noti.notiType.notiTypeCode === 40002 ? `🌞 ${noti.notiType.notiTitle}` 
                    : `🌝 ${noti.notiType.notiTitle}`}
                </h4>
                <div>
                    <p>{dateFormatHandler(noti.notiStartDate)}</p>
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/delete.png`}
                        onClick={ () => deleteHandler(noti.notiCode) }
                    />
                </div>
            </div>
            {/* 알림 내용이 29자 이상일 시, 그 이후 텍스트는 ...으로 표시 */}
            <p className={ notiCSS.notiItemBody }>{ noti.notiContent.length > 29 ? noti.notiContent.slice(0, 29) + '...' : noti.notiContent }</p>
        </div>
    );
}

export default NotificationItem;