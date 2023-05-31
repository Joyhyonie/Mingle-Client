import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLikedMsgListAPI, callRemovedMsgListAPI } from "../../apis/MessageAPICalls";
import { toast } from "react-hot-toast";
import { useState } from "react";
import MessageItem from "../../components/items/MessageItem";
import { motion } from "framer-motion"
import MessageCSS from "../../css/Message.module.css";


function BinMsgBox ({whichPage}) {

    const dispatch = useDispatch();
    const { removedMsg, likeMsg, removeMsg } = useSelector(state => state.MessageReducer);
    const [checkedIdList, setCheckedIdList] = useState([]);
    const [currentSize, setCurrentSize] = useState(10);                     
    const removedMsgList = removedMsg && removedMsg.data;

    useEffect(
        () => {
            /* 중요 쪽지함 조회 API 호출 */
            dispatch(callRemovedMsgListAPI(currentSize));

            if(removeMsg?.status === 200) {
                toast.success("선택하신 쪽지가 삭제되었습니다 :)");
            }

        },[likeMsg, removeMsg, currentSize]
    );

    /* 각 checkbox의 상태가 변경될 때 호출되는 이벤트 함수 */
    const checkboxChangeHandler = (e) => {
        const id = e.target.id;             // 해당 메시지의 id
        const isChecked = e.target.checked; // true/false

        if (isChecked) {
            setCheckedIdList([...checkedIdList, id]);
        } else { // 체크박스를 해제한 경우(false일 경우) checkedIdList에서 해당 id 제거하여 필터링한 후 다시 set에 저장
            setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id));
        }

        console.log("checkedIdList : {}", checkedIdList);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <div className={ MessageCSS.binMsgBoxInfo }><p>휴지통 속 쪽지는 전송일 기준 3개월 뒤 자동 영구 삭제 됩니다 :)</p></div>
            <div className={ MessageCSS.dummyBox1 }/><div className={ MessageCSS.dummyBox2 }/>
            <div className={ MessageCSS.msgListBox }>
                { removedMsgList && removedMsgList.map(message => (
                    <MessageItem
                        key={ message.msgCode }
                        message={ message }
                        isChecked={ checkedIdList.includes(String(message.msgCode)) }
                        checkboxChangeHandler={checkboxChangeHandler}
                        checkedIdList={checkedIdList}
                        setCheckedIdList={setCheckedIdList}
                        whichPage={whichPage}
                    />
                ))
                }
            </div>
            { removedMsg && removedMsg.totalElements > currentSize ? <div className={MessageCSS.moreBox} onClick={() => setCurrentSize(currentSize + 10)}>More</div> : null }
        </motion.div>
    );

}

export default BinMsgBox;