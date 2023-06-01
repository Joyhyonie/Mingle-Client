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
    const { receivedMsg, receivedMsgSearch, likeMsg, readMsg, removeMsg } = useSelector(state => state.MessageReducer);
    const [checkedIdList, setCheckedIdList] = useState([]);                 // check된 쪽지들의 id가 저장되는 state
    const [currentSize, setCurrentSize] = useState(10);                     // 전체 쪽지의 더보기 페이징을 위한 state
    const [searchedCurrentSize, setSearchedCurrentSize] = useState(10);     // 검색된 쪽지의 더보기 페이징을 위한 state
    const receivedMsgList = receivedMsg && receivedMsg.data;
    const receivedMsgSearchList = receivedMsgSearch && receivedMsgSearch.data;

    useEffect(
        () => {
            /* 받은 쪽지함 조회 API 호출 */
            dispatch(callReceivedMsgListAPI(currentSize));

            if(removeMsg?.status === 200) {
                toast.success("선택하신 쪽지가 삭제되었습니다 :)");
            } 

        },[likeMsg, removeMsg, currentSize] 
    );

    /* 검색한 쪽지에서 쪽지의 Header 클릭 시, 읽음처리 API 호출로 인해 re-rendering이 발생하여 검색한 쪽지가 아닌 전체 쪽지 조회가 일어나
       UX에 좋지 않은 영향을 끼치게 되므로 useEffect를 분리하여 검색한 쪽지가 존재하지 않을 경우에만 readMsg의 값이 변경될 때 전체 쪽지 조회가 일어나도록 함 */
    useEffect(
        () => {
            if(receivedMsgSearch == undefined) {
                /* 받은 쪽지함 조회 API 호출 */
                dispatch(callReceivedMsgListAPI(currentSize));
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
    
    /* 쪽지 전체 선택 함수 */
    const selectAllHandler = (selectAll) => {

        if (selectAll) {
            // 전체 선택이 되었다면 checkedList에 현재 조회된 요소들의 id를 모두 추가
            const allIds = (receivedMsgList || []).concat(receivedMsgSearchList || []).map((message) => String(message.msgCode));
            setCheckedIdList(allIds);
        } else {
            // 전체 선택이 취소되었다면 빈 배열 전달
            setCheckedIdList([]);
        }

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            
            <MessageSearchBar msgBoxType={ 'received' } searchedCurrentSize={searchedCurrentSize}/>
            <div className={ MessageCSS.dummyBox1 }/><div className={ MessageCSS.dummyBox2 }/>
            <div className={ MessageCSS.msgListBox }>
                {/* receivedMsg와 receivedMsgSearch가 모두 undefined인 경우에는 빈 배열([])을 이용하여 concat() 함수를 호출 (undefined 오류 발생 방지) */}
                { (receivedMsgList || []).concat(receivedMsgSearchList || []).length === 0 ? <p className={ MessageCSS.empty }>텅😶</p> :
                (receivedMsgList || []).concat(receivedMsgSearchList || []).map(message => (
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
                        selectAllHandler={ selectAllHandler }
                        checkedIdList={checkedIdList}
                        setCheckedIdList={setCheckedIdList}
                    />
                ))
                }
            </div>
            {/* 전체 받은 쪽지 or 검색된 받은 쪽지에 따라 다른 More버튼 노출 */}
            {/* 현재 pagination.size기 조회된 요소의 총 갯수(totalElements)보다 적을 때만 더보기 버튼 노출 */}
            { receivedMsgSearch ? (receivedMsgSearch.totalElements > searchedCurrentSize ? <div className={MessageCSS.moreBox} onClick={() => setSearchedCurrentSize(searchedCurrentSize + 10)}>More</div> : null) 
            : (receivedMsg && receivedMsg.totalElements > currentSize ? <div className={MessageCSS.moreBox} onClick={() => setCurrentSize(currentSize + 10)}>More</div> : null) }
        </motion.div>
    );
}

export default ReceivedMsgBox;