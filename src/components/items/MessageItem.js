import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import MessageCSS from '../../css/Message.module.css';
import { useDispatch } from 'react-redux';

function MessageItem ({setWhichPage, stateChangeHandler}) {  

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // check된 쪽지를 관리하기 위한 state

    /* (임시용) 현재 로그인한 유저의 정보를 가져옴 (sender/receiver 분별) */
    const currentUser = {
        empCode: 202312345,
        deptName: '학생처',
        empName: '허치즈',
    };
    const message = {
        msgCode: 12345,
        msgContent: '안녕하세요 방가방가 햄토리 :3',
        msgSendDate: '2023-05-15 13:30:30',
        msgImpSender: 'N',
        msgImpReceiver: 'Y',
        msgReadYn: 'N',
        msgSender: { empCode: 202311111, deptName: '교무처', empName: '신짱구' },
        msgReceiver: { empCode: 202312345, deptName: '학생처', empName: '허치즈' },
        msgDelSender: 'N',
        msgDelReveiver: 'N'
    }

    /* 해당 쪽지가 받은 쪽지인지, 보낸 쪽지인지 확인하여 from/to 표시 */
    const fromOrTo = () => {
        if (message.msgSender.empCode === currentUser.empCode) {
            return <><span>To</span> {message.msgReceiver.deptName} {message.msgReceiver.empName}</>;
        } else {
            return <><span>From</span> {message.msgSender.deptName} {message.msgSender.empName}</>;
        }
    }

    /* 해당 쪽지를 현재 로그인한 유저가 좋아요를 했는지 확인 후, 했으면 꽉 찬 하트, 하지 않았으면 빈 하트 노출 */
    const likeIconHandler = () => {
        if (message.msgSender.empCode === currentUser.empCode) {
            /* 현재 로그인 유저가 해당 쪽지의 보낸 사람일 경우, */
            if (message.msgImpSender === 'Y') {
                return <img onClick={ senderLikeHandler('N', message.msgCode) } src="/images/like-hover.png"/>
            } else {
                return <img onClick={ senderLikeHandler('N', message.msgCode) } src="/images/unlike.png"/>
            }
            
        } else {
            /* 현재 로그인 유저가 해당 쪽지의 받는 사람일 경우, */
            if (message.msgImpReceiver === 'Y') {
                return <img onClick={ receiverLikeHandler('N', message.msgCode) } src="/images/like-hover.png"/>
            } else {
                return <img onClick={ receiverLikeHandler('Y', message.msgCode) }src="/images/unlike.png"/>
            }
        }
    }

    /* 해당 쪽지가 받은 쪽지라면 답장 버튼, 보낸 쪽지라면 읽음 여부 노출 */
    const replyOrReadHandler = () => {
        if (message.msgSender.empCode === currentUser.empCode) {
            /* 보낸 쪽지 */
            if(message.msgReadYn === 'Y') {
                return <p>읽음</p>
            } else {
                return <p>읽지않음</p>
            }
        } else {
            /* 받은 쪽지 */
            return <button onClick={ moveToReply }>답장</button>
        }
    }

    /* 전송된 날짜 포맷 함수 */
    const fommatedDate = () => {
        const date = new Date(message.msgSendDate);
        // 코드 정렬 시, 여백이 생기는 문제가 발생하므로 이대로 고정
        return `${date.getFullYear().toString().substr(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} 
                ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    /* 쪽지의 Header를 클릭 시, 쪽지 토글 이벤트 함수 */
    const msgOpenHandler = (msgCode) => {
        setIsOpen(!isOpen)

        /* 현재 로그인한 유저가 받는 사람일 경우, 쪽지 Header 클릭 시, 읽음 여부 'Y'로 변경 */
        if (message.msgImpReceiver.empCode === currentUser.empCode) {
            console.log('나 읽었다!');
            // dispatch(callMsgReadAPI(msgCode));
        }
    }

    /* 받는 사람의 중요 쪽지 등록/취소를 컨트롤 하는 이벤트 함수 */
    const receiverLikeHandler = (YesOrNo, msgCode) => {
        // 해당 쪽지 msgImpReceiver의 'Y' or 'N'를 patch 메소드로 변경
        // dispatch(callReceiverLikeChangeAPI({YesOrNo, msgCode}));
    }

    /* 보낸 사람의 중요 쪽지 등록/취소를 컨트롤 하는 이벤트 함수 */
    const senderLikeHandler = (YesOrNo, msgCode) => {
        // 해당 쪽지 msgImpSender 'Y' or 'N'를 patch 메소드로 변경
        // dispatch(callSenderLikeChangeAPI({YesOrNo, msgCode}));
    }

    /* '답장' 버튼 클릭 시, 해당 메시지의 content및 Sender의 정보와 함께 쪽지전송페이지로 이동 */
    const moveToReply = () => {
        setWhichPage('writeMsg'); 
        stateChangeHandler('writeIsClicked');
        /* 정보 넘기는 로직 추가해야함 !! */
    }

    /* checkbox 마다의 checked/unchecked 관리 */
    const checkboxChangeHandler = (e) => {
        console.log(e.target.checked) // true/false
        setIsChecked(e.target.checked);
    }

    return (
        <div className={ MessageCSS.msgItemBox }>
            <motion.div 
                className={ MessageCSS.msgItemHeader }
                style={{ border: message.msgReadYn === 'Y' ? '1px solid lightgray' : null }}
                onClick={ msgOpenHandler(message.msgCode) }
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
            <div className={ MessageCSS.flex }>
                <input 
                    type='checkbox' 
                    checked={isChecked} 
                    onClick={ (e) => e.stopPropagation() } /* 이벤트 버블링 방지 */
                    onChange={ checkboxChangeHandler }
                /> 
                <h4>{fromOrTo()}</h4>
            </div>
            <p>{fommatedDate()}</p>
            </motion.div>
            <AnimatePresence>
                { isOpen && (
                    <motion.div
                        className={ MessageCSS.msgItemBody }
                        style={{ border: message.msgReadYn === 'Y' ? '1px solid lightgray' : null,
                                 borderTop: message.msgReadYn === 'Y' ? 'none' : null}}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                    >
                        <div className={ MessageCSS.msgItemContentBox }>
                            {message.msgContent}
                        </div>
                        <div className={ MessageCSS.msgItemFooterBox }>
                            {likeIconHandler()}
                            {replyOrReadHandler()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MessageItem;