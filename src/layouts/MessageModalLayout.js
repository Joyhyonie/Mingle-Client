import { useEffect, useState } from 'react';
import MessageCSS from '../css/Message.module.css';
import { motion } from "framer-motion"
import WriteMsg from '../pages/message/WriteMsg';
import LikeMsgBox from '../pages/message/LikeMsgBox';
import ReceivedMsgBox from '../pages/message/ReceivedMsgBox';
import SentMsgBox from '../pages/message/SentMsgBox';
import { useDispatch } from 'react-redux';
import BinMsgBox from '../pages/message/BinMsgBox';

function MessageModalLayout ({setMessageModal, setMsgClicked}) {
    
    const dispatch = useDispatch();
    const [replyContent, setReplyContent] = useState('');           // '답장' 클릭 시, 받은 쪽지 내용과 함께 답장시키기 위한 state
    const [selectedDeptCode, setSelectedDeptCode] = useState('');   // '답장' 클릭 시, Sender의 소속코드
    const [selectedEmpCode, setSelectedEmpCode] = useState('');     // '답장' 클릭 시, Sender의 교번
    const [selectedEmpName, setSelectedEmpName] = useState('');     // '답장' 클릭 시, Sender의 이름
    const [selectedEmpId, setSelectedEmpId] = useState('');         // '답장' 클릭 시, Sender의 ID
    const [whichPage, setWhichPage] = useState('receivedMsgBox');
    const [isClickedstate, setIsClickedState] = useState({          // 클릭된 메뉴를 컨트롤 하기 위한 state
        receivedIsClicked: true,
        sentIsClicked: false,
        writeIsClicked: false,
        likedIsClicked: false,
        binIsClicked: false
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
            receivedIsClicked: stateName === 'receivedIsClicked' ? true : false,
            sentIsClicked: stateName === 'sentIsClicked' ? true : false,
            writeIsClicked: stateName === 'writeIsClicked' ? true : false,
            likedIsClicked: stateName === 'likedIsClicked' ? true : false,
            binIsClicked: stateName === 'binIsClicked' ? true : false
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
                sentMsgBox: <SentMsgBox/>,
                writeMsg: <WriteMsg replyContent={replyContent} 
                                    setReplyContent={setReplyContent} 
                                    selectedDeptCode={selectedDeptCode} 
                                    selectedEmpCode={selectedEmpCode} 
                                    selectedEmpName={selectedEmpName}
                                    selectedEmpId={selectedEmpId}
                                    setWhichPage={setWhichPage}
                                    stateChangeHandler={stateChangeHandler}
                            />,
                likeMsgBox: <LikeMsgBox whichPage={whichPage} />,
                binMsgBox: <BinMsgBox whichPage={whichPage} /> 
            };
            return components[whichPage] || null;

        } else if(arg === 'header') {
            const components = {
                receivedMsgBox: <p>받은 쪽지함</p>,
                sentMsgBox: <p>보낸 쪽지함</p>,
                writeMsg: <p>쪽지 작성</p>,
                likeMsgBox: <p>중요 쪽지함</p>,
                binMsgBox: <p>휴지통</p>
            };
            return components[whichPage] || null;
        }
    }
        

    return (
        <div className={ MessageCSS.modalBox }>
            <div className={ MessageCSS.navBar }>
                {isClickedstate.receivedIsClicked ? (
                    <motion.img
                        src="/images/received-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/received.png"
                        onClick={() => {setWhichPage('receivedMsgBox'); stateChangeHandler('receivedIsClicked');}}
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
                {isClickedstate.likedIsClicked ? (
                    <motion.img
                        src="/images/like-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/like.png"
                        onClick={() => {setWhichPage('likeMsgBox'); stateChangeHandler('likedIsClicked');}}
                        whileHover={{ scale: 1.05 }}
                    />
                )}
                {isClickedstate.binIsClicked ? (
                    <motion.img
                        src="/images/bin-hover.png"
                        whileHover={{ scale: 1.05 }}
                    />
                ) : (
                    <img
                        src="/images/bin.png"
                        onClick={() => {setWhichPage('binMsgBox'); stateChangeHandler('binIsClicked');}}
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
                                setMsgClicked(false);
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