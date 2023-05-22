import { motion } from "framer-motion"
import MessageSearchBar from "../../components/common/MessageSearchBar";
import MessageItem from "../../components/items/MessageItem";
import MessageCSS from "../../css/Message.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { callLikedMsgListAPI } from "../../apis/MessageAPICalls";

function LikeMsgBox ({setWhichPage, stateChangeHandler}) {

    const dispatch = useDispatch();
    const { likedMsg } = useSelector(state => state.MessageReducer);
    const [messageList, setMessageList] = useState([]);
    const [checkedIdList, setCheckedIdList] = useState([]);

    useEffect(
        () => {
            /* 중요 쪽지함 조회 API 호출 */
            dispatch(callLikedMsgListAPI());
        },[]
    );

    /* 삭제할 쪽지 */
    const deleteMsgHandler = () => {

        /* 현재 로그인한 유저가 해당 id를 가진 쪽지들의 msgSender라면, msgDelSender를 'Y'로 변경 및
           msgReceiver라면, msgDelReceiver를 'Y'로 변경하는 API */
        // dispatch(callLikeMsgDeleteAPI);

        console.log(checkedIdList);
        setMessageList(messageList.filter((msg) => !checkedIdList.includes(String(msg.id))));
        setCheckedIdList([]); // 선택되었던 체크박스의 체크 상태 초기화

        if (checkedIdList.length === 0) {
            toast.error('삭제할 쪽지를 선택해주세요 !');
        } else { // status === 200 시, success 알림 조건 추가 예정
            toast.success('선택된 쪽지가 삭제되었습니다');
        }

    }

    /* 각 checkbox의 상태가 변경될 때 호출되는 이벤트 함수 */
    const checkboxChangeHandler = (e) => {
        const id = e.target.id;             // 해당 메시지의 id
        const isChecked = e.target.checked; // true/false

        if (isChecked) {
            setCheckedIdList([...checkedIdList, id]);
        } else { 
            setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id));
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <button 
                className={ MessageCSS.deleteButton }
                onClick={ deleteMsgHandler }
            >
                삭제
            </button>
            <MessageSearchBar/>
            <div className={ MessageCSS.dummyBox }/>
            <div className={ MessageCSS.msgListBox }>
                { likedMsg && likedMsg.map(message => (
                    <MessageItem 
                        key={ message.msgCode }
                        message={ message }
                        setWhichPage={setWhichPage} 
                        stateChangeHandler={stateChangeHandler}
                        isChecked={checkedIdList.includes(String(message.msgCode))}
                        checkboxChangeHandler={checkboxChangeHandler}
                    />
                ))
                }
            </div>
        </motion.div>
    );
}

export default LikeMsgBox;