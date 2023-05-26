import { motion } from "framer-motion"
import MessageSearchBar from "../../components/common/MessageSearchBar";
import MessageItem from "../../components/items/MessageItem";
import MessageCSS from "../../css/Message.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReceivedMsgListAPI } from "../../apis/MessageAPICalls";
import { toast } from "react-hot-toast";

function ReceivedMsgBox ({setWhichPage, stateChangeHandler, setReplyContent, setSelectedDeptCode, setSelectedEmpCode, setSelectedEmpName, setSelectedEmpId}) {

    const dispatch = useDispatch();
    const { receivedMsg, likeMsg, readMsg, removeMsg, receivedMsgSearch } = useSelector(state => state.MessageReducer);
    const [checkedIdList, setCheckedIdList] = useState([]);     // check된 쪽지들의 id가 저장되는 state

    useEffect(
        () => {
            /* 받은 쪽지함 조회 API 호출 */
            dispatch(callReceivedMsgListAPI());

            if(removeMsg?.status === 200) {
                toast.success("선택하신 쪽지가 삭제되었습니다 :)");
            }

        },[likeMsg, removeMsg] 
    );

    /* 검색한 쪽지에서 쪽지의 Header 클릭 시, 읽음처리 API 호출로 인해 re-rendering이 발생하여 검색한 쪽지가 아닌 전체 쪽지 조회가 일어나
       UX에 좋지 않은 영향을 끼치게 되므로 useEffect를 분리하여 검색한 쪽지가 존재하지 않을 경우에만 readMsg의 값이 변경될 때 전체 쪽지 조회가 일어나도록 함 */
    useEffect(
        () => {

            if(receivedMsgSearch == undefined) {
                /* 받은 쪽지함 조회 API 호출 */
                dispatch(callReceivedMsgListAPI());
            }

        },[readMsg]
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
            
            <MessageSearchBar msgBoxType={ 'received' }/>
            <div className={ MessageCSS.dummyBox }/>
            <div className={ MessageCSS.msgListBox }>
                {/* receivedMsg와 receivedMsgSearch가 모두 undefined인 경우에는 빈 배열([])을 이용하여 concat() 함수를 호출 (undefined 오류 발생 방지) */}
                { (receivedMsg || []).concat(receivedMsgSearch || []).map(message => (
                    <MessageItem 
                        key={ message.msgCode }
                        message={ message }
                        setWhichPage={ setWhichPage } 
                        stateChangeHandler={ stateChangeHandler }
                        setReplyContent={ setReplyContent }
                        setSelectedDeptCode={ setSelectedDeptCode } 
                        setSelectedEmpCode={ setSelectedEmpCode }
                        setSelectedEmpName={ setSelectedEmpName }
                        setSelectedEmpId={ setSelectedEmpId }
                        isChecked={ checkedIdList.includes(String(message.msgCode)) }
                        checkboxChangeHandler={ checkboxChangeHandler }
                        checkedIdList={checkedIdList}
                        setCheckedIdList={setCheckedIdList}
                    />
                ))
                }
            </div>
        </motion.div>
    );
}

export default ReceivedMsgBox;