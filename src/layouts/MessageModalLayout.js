import { useEffect, useState } from 'react';
import MessageCSS from '../css/Message.module.css';
import { motion } from "framer-motion"
import WriteMsg from '../pages/message/WriteMsg';
import LikeMsgBox from '../pages/message/LikeMsgBox';
import ReceivedMsgBox from '../pages/message/ReceivedMsgBox';
import SentMsgBox from '../pages/message/SentMsgBox';
import { useDispatch } from 'react-redux';

function MessageModalLayout ({setMessageModal, isIconClickedState, setIsIconClickedState}) {
    
    const dispatch = useDispatch();
    const [replyContent, setReplyContent] = useState('');           // '답장' 클릭 시, 받은 쪽지 내용과 함께 답장시키기 위한 state
    const [selectedDeptCode, setSelectedDeptCode] = useState('');   // '답장' 클릭 시, Sender의 소속코드
    const [selectedEmpCode, setSelectedEmpCode] = useState('');     // '답장' 클릭 시, Sender의 교번
    const [selectedEmpName, setSelectedEmpName] = useState('');     // '답장' 클릭 시, Sender의 이름
    const [selectedEmpId, setSelectedEmpId] = useState('');         // '답장' 클릭 시, Sender의 이름
    const [whichPage, setWhichPage] = useState('receivedMsgBox');
    const [isClickedstate, setIsClickedState] = useState({          // 클릭된 메뉴를 컨트롤 하기 위한 state
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
                receivedMsgBox: <ReceivedMsgBox setWhichPage={setWhichPage} 
                                                stateChangeHandler={stateChangeHandler} 
                                                setReplyContent={setReplyContent} 
                                                setSelectedDeptCode={setSelectedDeptCode} 
                                                setSelectedEmpCode={setSelectedEmpCode}
                                                setSelectedEmpName={setSelectedEmpName}
                                                setSelectedEmpId={setSelectedEmpId} />,
                sentMsgBox: <SentMsgBox setWhichPage={setWhichPage} stateChangeHandler={stateChangeHandler}/>,
                writeMsg: <WriteMsg replyContent={replyContent} 
                                    setReplyContent={setReplyContent} 
                                    selectedDeptCode={selectedDeptCode} 
                                    selectedEmpCode={selectedEmpCode} 
                                    selectedEmpName={selectedEmpName}
                                    selectedEmpId={selectedEmpId}
                                    setWhichPage={setWhichPage}
                                    stateChangeHandler={stateChangeHandler}
                            />,
                likeMsgBox: <LikeMsgBox setWhichPage={setWhichPage} stateChangeHandler={stateChangeHandler}/>
            };
            return components[whichPage] || null;

        } else if(arg === 'header') {
            const components = {
                receivedMsgBox: <p>받은 쪽지함</p>,
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
                        onClick={() => {setWhichPage('receivedMsgBox'); stateChangeHandler('receiveIsClicked');}}
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
                        onClick={() => {setWhichPage('writeMsg'); 
                                        stateChangeHandler('writeIsClicked');
                                        /* '답장' 클릭 후, 아래의 state들이 set된 상태이므로, 다시 새 쪽지 전송을 눌러도 유지가 되어있음. 따라서 초기화 */
                                        setReplyContent('');
                                        setSelectedDeptCode('');
                                        setSelectedEmpCode('');
                                        setSelectedEmpName('');
                                }}
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
                            src={`${process.env.PUBLIC_URL}/images/close.png`}
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