import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import MessageCSS from '../../css/Message.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callGetEmployeeAPI } from '../../apis/EmployeeAPICalls';
import { callLikeMsgAPI, callReadMsgAPI, callReceivedMsgListAPI } from '../../apis/MessageAPICalls';

function MessageItem ({message, isChecked, setWhichPage, stateChangeHandler, checkboxChangeHandler, setReplyContent, setSelectedDeptCode, setSelectedEmpCode}) {  

    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.EmployeeReducer);
    const { readMsg } = useSelector(state => state.MessageReducer);
    const { likeMsg } = useSelector(state => state.MessageReducer);
    const [isOpen, setIsOpen] = useState(false);

    console.log("employee => ", employee);
    console.log("message =>", message);

    useEffect(
        () => {
            /* 현재 로그인한 유저 조회 API 호출 */
            dispatch(callGetEmployeeAPI());
        },[]
    );

    /* 해당 쪽지가 받은 쪽지인지, 보낸 쪽지인지 확인하여 from/to 표시 */
    const fromOrTo = () => {
        if (message.sender.empCode === employee.empCode) {
            return <><span>To</span> {message.receiver.department.deptName} {message.receiver.empName}</>;
        } else {
            return <><span>From</span> {message.sender.department.deptName} {message.sender.empName}</>;
        }
    }

    /* 해당 쪽지를 현재 로그인한 유저가 좋아요를 했는지 확인 후, 했으면 꽉 찬 하트, 하지 않았으면 빈 하트 노출 */
    const likeIconHandler = () => {
        if (message.sender.empCode === employee.empCode) {
            /* 현재 로그인 유저가 해당 쪽지의 보낸 사람일 경우, */
            if (message.msgImpSender === 'Y') {
                return <img onClick={ likeHandler(message.msgCode) } src="/images/like-hover.png"/>
            } else {
                return <img onClick={ likeHandler(message.msgCode) } src="/images/unlike.png"/>
            }
            
        } else {
            /* 현재 로그인 유저가 해당 쪽지의 받는 사람일 경우, */
            if (message.msgImpReceiver === 'Y') {
                return <img onClick={ likeHandler(message.msgCode) } src="/images/like-hover.png"/>
            } else {
                return <img onClick={ likeHandler(message.msgCode) }src="/images/unlike.png"/>
            }
        }
    }

    /* 해당 쪽지가 받은 쪽지라면 답장 버튼, 보낸 쪽지라면 읽음 여부 노출 */
    const replyOrReadHandler = () => {
        if (message.sender.empCode === employee.empCode) {
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
        if (message.receiver.empCode == employee.empCode) {
            dispatch(callReadMsgAPI(msgCode));
        }
    }

    /* 현재 로그인한 유저의 중요 쪽지 등록/취소를 컨트롤 하는 이벤트 함수 */
    const likeHandler = (msgCode) => {
        // dispatch(callLikeMsgAPI(msgCode));
    }

    /* '답장' 버튼 클릭 시, 해당 메시지의 content및 Sender의 정보와 함께 쪽지전송페이지로 이동 */
    const moveToReply = () => {
        setWhichPage('writeMsg'); 
        stateChangeHandler('writeIsClicked');
        // content 정보 넘기기
        setReplyContent(message.msgContent);
        setSelectedDeptCode(message.msgSender.deptCode);
        setSelectedEmpCode(message.sender.empCode);
    }
    

    return (
        <div className={ MessageCSS.msgItemBox }>
            <motion.div 
                className={ MessageCSS.msgItemHeader }
                style={{ border: message.msgReadYn === 'Y' ? '1px solid lightgray' : null }}
                onClick={ () => msgOpenHandler(message.msgCode) }
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
            <div className={ MessageCSS.flex }>
                <input 
                    type='checkbox'
                    id={ message.msgCode }
                    checked={ isChecked }
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
                            <p>{message.msgContent}</p>
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