import ToastCSS from '../css/common/Toast.module.css';
import { toast } from 'react-hot-toast';

function SseConnect () {
    
    const url = "http://localhost:8001";
    const token = window.localStorage.getItem('accessToken');

    let eventSource;
    if (!eventSource && token != null) {
        eventSource = new EventSource(`${url}/noti?token=${token}`);
        console.log("서버로 이벤트 구독 완🥳")

        eventSource.addEventListener("receivedMsg", (e) => {
            const data = JSON.parse(e.data);
            const senderImg = data.sender.empProfile;
            const senderName = data.sender.empName;
            const msgContent = data.msgContent;
            customMessageNoti(senderImg, senderName, msgContent);
        });

        eventSource.addEventListener("commonNoti", (e) => {
            const data = JSON.parse(e.data);
            const notiTitle = data.notiType.notiTitle;
            const notiContent = data.notiContent;
            customCommonNoti(notiTitle, notiContent);
        })

        eventSource.addEventListener("error", (e) => {
            // eventSource.close();
            console.error("SSE 연결 오류 원인 => ", e);
            console.log("🔥🔥🔥 구독 ... 취소 ... 🔥🔥🔥");
        });
    }

    /* 실시간 쪽지 알림 커스텀 함수 */
    const customMessageNoti = (senderImg, senderName, msgContent) => {

        toast.custom((t) => (
            <div
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

}

export default SseConnect;