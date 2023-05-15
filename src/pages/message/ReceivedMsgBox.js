import { motion } from "framer-motion"
import MessageSearchBar from "../../components/common/MessageSearchBar";
import MessageItem from "../../components/items/MessageItem";
import MessageCSS from "../../css/Message.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ReceivedMsgBox ({setWhichPage, stateChangeHandler}) {

    const dispatch = useDispatch();
    const [messageList, setMessageList] = useState([]);   // API로 조회해온 messageList

    // useEffect(
    //     () => {
    //         /* msgReceiver가 현재 로그인 한 유저인 쪽지들 중 msgDelReveiver가 N인 쪽지들을 조회하는 API (받은 쪽지함 조회) */
    //         // dispatch(callReceivedMsgListAPI);

    //     },[]
    // );

    /* 삭제할 쪽지 */
    const deleteMsgHandler = () => {
        const checkedMsg = messageList.filter(msg => msg.isChecked);    // Check된 msg만을 filtering
        const idList = checkedMsg.map(msg => msg.id);                   // Check된 msg의 id들을 모아옴

        /* 해당 id를 가진 쪽지들의 msgDelReveiver를 'Y'로 변경하는 API */
        // dispatch(callReceiverMsgDeleteAPI);

    }

    const MsgCheckHandler = () => {

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <button 
                className={ MessageCSS.deleteButton }
                // onClick={ deleteMsgHandler }
            >
                삭제
            </button>
            <MessageSearchBar/>
            <div className={ MessageCSS.dummyBox }/>
            <div className={ MessageCSS.msgListBox }>
                <MessageItem 
                    // key={ message.id }
                    // message={ message }
                    setWhichPage={setWhichPage} 
                    stateChangeHandler={stateChangeHandler}
                    // isChecked={message.isChecked}
                    // onCheck={handleNoteCheck}
                />
            </div>
        </motion.div>
    );
}

export default ReceivedMsgBox;