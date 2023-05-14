import { useEffect, useState } from 'react';
import MessageCSS from '../css/Message.module.css';
import { motion } from "framer-motion"
import WriteMsg from '../pages/message/WriteMsg';
import LikeMsgBox from '../pages/message/LikeMsgBox';
import ReceiveMsgBox from '../pages/message/ReceiveMsgBox';
import SentMsgBox from '../pages/message/SentMsgBox';

function MessageModalLayout ({setMessageModal, isIconClickedState, setIsIconClickedState}) {
    
    const [whichPage, setWhichPage] = useState('receiveMsgBox');
    const [isClickedstate, setIsClickedState] = useState({ // 클릭된 메뉴 컨트롤 state
        receiveIsClicked: true,
        sentIsClicked: false,
        writeIsClicked: false,
        likeIsClicked: false
    });

    /* 각 아이콘이 클릭될 때마다 해당 페이지를 렌더링 */
    useEffect(
        () => {
        }, [whichPage]
    );

    /* 클릭된 메뉴를 컨트롤 하기 위한 이벤트 함수 */
    const stateChangeHandler = (stateName) => {
        setIsClickedState(prevState => ({
          ...prevState,
          [stateName]: true,
          receiveIsClicked: stateName === 'receiveIsClicked' ? true : false,
          sentIsClicked: stateName === 'sentIsClicked' ? true : false,
          writeIsClicked: stateName === 'writeIsClicked' ? true : false,
          likeIsClicked: stateName === 'likeIsClicked' ? true : false
        }));
    }

    /* 클릭된 페이지를 각각 렌더링 하기 위한 이벤트 함수 */
    const WhichPageHandler = (arg) => {

        if (arg === 'body') {
            const components = {
                receiveMsgBox: <ReceiveMsgBox />,
                sentMsgBox: <SentMsgBox />,
                writeMsg: <WriteMsg />,
                likeMsgBox: <LikeMsgBox />
            };
            return components[whichPage] || null;

        } else if(arg === 'header') {
            const components = {
                receiveMsgBox: <p>받은 쪽지함</p>,
                sentMsgBox: <p>보낸 쪽지함</p>,
                writeMsg: <p>쪽지 작성</p>,
                likeMsgBox: <p>중요 쪽지함</p>
            };
            return components[whichPage] || null;
        }
    }
        

    return (
        <div className={ MessageCSS.modalBox }>
            <div className={ MessageCSS.navBar }>
                {isClickedstate.receiveIsClicked ? (
                    <motion.img
                        src="/images/receive-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/receive.png"
                        onClick={() => {setWhichPage('receiveMsgBox'); stateChangeHandler('receiveIsClicked');}}
                        whileHover={{ scale: 1.05 }}
                    />
                )}
                {isClickedstate.sentIsClicked ? (
                    <motion.img
                        src="/images/sent-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/sent.png"
                        onClick={() => {setWhichPage('sentMsgBox'); stateChangeHandler('sentIsClicked');}}
                        whileHover={{ scale: 1.05 }}
                    />
                )}
                {isClickedstate.writeIsClicked ? (
                    <motion.img
                        src="/images/write-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/write.png"
                        onClick={() => {setWhichPage('writeMsg'); stateChangeHandler('writeIsClicked');}}
                        whileHover={{ scale: 1.05 }}
                    />
                )}
                {isClickedstate.likeIsClicked ? (
                    <motion.img
                        src="/images/like-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/like.png"
                        onClick={() => {setWhichPage('likeMsgBox'); stateChangeHandler('likeIsClicked');}}
                        whileHover={{ scale: 1.05 }}
                    />
                )}
            </div>
            <div>
                <div className={ MessageCSS.flex }>
                    <div className={ MessageCSS.header }>
                        {WhichPageHandler('header')}
                    </div>
                    <div className={ MessageCSS.closeButton }>
                        <img 
                            src="./images/close.png"
                            onClick={ () => {
                                setIsIconClickedState(!isIconClickedState.msgIsClicked);
                                setMessageModal(false);
                            }}
                        />
                    </div>
                </div>
                <div className={ MessageCSS.body }>
                    {WhichPageHandler('body')}
                </div>
            </div>
        </div>
    );
}

export default MessageModalLayout;