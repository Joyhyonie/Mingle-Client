import { useDispatch } from "react-redux";
import notiCSS from "../../css/Notification.module.css";
import dayjs from 'dayjs';
import { toast } from "react-hot-toast";

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

        if (diffDays === 0 && diffHours === 0) {
            return `${diffMinutes}분 전`
        } else if (diffDays === 0) {
            return `${diffHours}시간 전`
        } else {
            return `${diffDays}일 전`
        }

    }

    /* '삭제'클릭 시, 해당 알림 삭제  */
    const deleteHandler = (notiCode) => {
        // dispatch(callDeleteNotiAPI(notiCode))

        // status === 200일 시,
        toast.success("해당 알림이 삭제되었습니다") // 알림창이 뜨면서 전체 삭제된 알림창을 렌더링 하고싶은데 useEffect에서 어떻게 돌릴까?
    }
    

    return (
        <div className={ notiCSS.notiItemBox }>
            <div className={ notiCSS.notiItemHeader }>
                <h4>{noti.notiTypeCode === 1 ? `💬 ${noti.notiTitle}` : noti.notiTypeCode === 2 ? `🌞 ${noti.notiTitle}` : `🌝 ${noti.notiTitle}`}</h4>
                <div>
                    <p>{dateFormatHandler(noti.notiDate)}</p>
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