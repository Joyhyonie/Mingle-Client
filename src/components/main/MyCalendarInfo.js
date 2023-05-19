import { motion } from "framer-motion"
import MainCSS from "../../css/Main.module.css"
import { useEffect, useState } from "react";
import AddScheduleModal from "../modal/AddScheduleModal";
import ModifyScheduleModal from "../modal/ModifyScheduleModal";
import { useDispatch, useSelector } from "react-redux";
import { callMyScheduleByDateAPI, callMyScheduleCheckAPI } from "../../apis/ScheduleAPICalls";

function MyCalendarInfo ({dateInMyCal}) {

    const dispatch = useDispatch();
    const { mySchedule } = useSelector(state => state.ScheduleReducer);
    const [addScheduleModal, setAddScheduleModal] = useState(false);        // 나의 일정 추가 modal관리용 state
    const [modifyScheduleModal, setModifyScheduleModal] = useState(false);  // 나의 일정 수정 modal관리용 state
    const [isChecked, setIsChecked] = useState(false);                      // 체크박스 클릭 시, 현재 이 컴포넌트를 리렌더링 하기 위한 state
    const [selectedSchedule, setSelectedSchedule] = useState(null);         // 일정 수정 모달창에 클릭된 일정의 정보를 담아 보내기 위한 state

    /* 체크 박스 클릭 시, 리렌더링을 위한 useEffect (현재 동작 X) */
    useEffect(
        () => {
            const date = new Date(dateInMyCal);
            const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\.| )/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            console.log("MyCalendarInfo의 formattedDate => ", formattedDate);
            dispatch(callMyScheduleByDateAPI(formattedDate));
        },[isChecked]
    );

    /* 클릭된 날짜의 월/일/요일을 변경시키는 이벤트 함수 */
    const clickedDateHandler = () => {
        const clickedDate = new Date(dateInMyCal);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${clickedDate.getMonth() + 1}월 ${clickedDate.getDate()}일 ${days[clickedDate.getDay()]}요일`;
    }

    /* 체크박스 클릭 시, 해당 완료 여부가 Y/N으로 변경되는 이벤트 함수 */
    const changeCheckBox = (scheCode) => {
        setIsChecked(!isChecked);
        dispatch(callMyScheduleCheckAPI(scheCode));
    }

    return (
        <>
            {/* 일정 추가 모달창 */}
            <div>
                { addScheduleModal ?
                    (<AddScheduleModal setAddScheduleModal={setAddScheduleModal}/>) : null
                }
            </div>

            {/* 일정 수정 모달창 */}
            <div>
                { modifyScheduleModal ?
                    (<ModifyScheduleModal selectedSchedule={selectedSchedule} setModifyScheduleModal={setModifyScheduleModal}/>) : null
                }
            </div>

            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            >
                <div className={ MainCSS.ScheduleInfoBox }>
                    <div className={ MainCSS.dateBox }>
                        <p>{clickedDateHandler()}</p>
                        <div
                            onClick={ () => setAddScheduleModal(true) }
                        >
                            추가
                        </div>
                    </div>
                    <div className={ MainCSS.toDoItemList }>
                        { mySchedule && mySchedule.map(schedule => (
                            <div className={ MainCSS.toDoItemBox }>
                                <div className={ MainCSS.colorAndToDo }>
                                    <div className={ MainCSS.colorBox } style={{background: schedule.colorCode}}></div>
                                    <p
                                        style={ schedule.doneYn.trim() == 'Y' ? {textDecoration: 'line-through', color:'#666666'} : null}
                                        onClick={ () => {setModifyScheduleModal(true); setSelectedSchedule(schedule);} }
                                    >
                                        {schedule.scheName}
                                    </p>
                                </div>
                                <img 
                                    src={ schedule.doneYn.trim() == 'Y' ? "./images/checked.png" : "./images/unchecked.png"}
                                    onClick={ () => changeCheckBox(schedule.scheCode) }
                                />
                            </div>
                            ))
                        }
                    </div>
                    
                </div>
            </motion.div>
        </>
    );
}

export default MyCalendarInfo;