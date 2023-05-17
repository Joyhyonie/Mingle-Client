import { motion } from "framer-motion"
import MainCSS from "../../css/Main.module.css"
import { useEffect, useState } from "react";
import AddScheduleModal from "../modal/AddScheduleModal";
import ModifyScheduleModal from "../modal/ModifyScheduleModal";
import { useDispatch } from "react-redux";

function MyCalenderInfo ({dateInMyCal}) {

    const dispatch = useDispatch();
    const [isDone, setIsDone] = useState(false); // (임시용) 완료된 toDoItem 여부
    const [addScheduleModal, setAddScheduleModal] = useState(false);        // 나의 일정 추가 modal관리용 state
    const [modifyScheduleModal, setModifyScheduleModal] = useState(false);  // 나의 일정 수정 modal관리용 state

    // (임시용)
    const schedules = {scheCode: 12345, scheName: '교무처 관련 서류 정리 후 제출', scheStartDate: '2023-05-02', scheEndDate: '2023-05-12', colorCode: '#D2CBFF'}

    
    useEffect(
        () => {
            /* 현재 로그인한 유저의 일정 조회 API */
            // dispatch(callGetMySchedule());
            
        },[]
    );

    /* 클릭된 날짜의 월/일/요일을 변경시키는 이벤트 함수 */
    const clickedDateHandler = () => {
        const clickedDate = new Date(dateInMyCal);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${clickedDate.getMonth() + 1}월 ${clickedDate.getDate()}일 ${days[clickedDate.getDay()]}요일`;
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
                    (<ModifyScheduleModal schedules={schedules} setModifyScheduleModal={setModifyScheduleModal}/>) : null
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
                        <div className={ MainCSS.toDoItemBox }>
                            <div className={ MainCSS.colorAndToDo }>
                                <div className={ MainCSS.colorBox } style={{background:"#B6E37B"}}></div>
                                <p
                                    style={isDone ? {textDecoration: 'line-through', color:'#666666'} : null}
                                    onClick={ () => setModifyScheduleModal(true) }
                                >
                                    교무처 관련 서류 정리 후 제출
                                </p>
                            </div>
                            <img 
                                src={ isDone ? "./images/checked.png" : "./images/unchecked.png"}
                                onClick={ () => setIsDone(!isDone) }
                            />
                        </div>

                        {/*  ---------------- 아래부터는 dummy data ----------------  */}

                        <div className={ MainCSS.toDoItemBox }>
                            <div className={ MainCSS.colorAndToDo }>
                                <div className={ MainCSS.colorBox } style={{background:"#FFE39B"}}></div>
                                <p>외식조리학과 학과장님 세미나 자료 준비</p>
                            </div>
                            <img src="./images/unchecked.png"></img>
                        </div>
                        <div className={ MainCSS.toDoItemBox }>
                            <div className={ MainCSS.colorAndToDo }>
                                <div className={ MainCSS.colorBox } style={{ background:"#FF9B9B" }}></div>
                                <p style={{textDecoration:'line-through', color:'#666666'}}>3층 시설물 안전 점검 신청</p>
                            </div>
                            <img src="./images/checked.png"></img>
                        </div>
                        <div className={ MainCSS.toDoItemBox }>
                            <div className={ MainCSS.colorAndToDo }>
                                <div className={ MainCSS.colorBox } style={{ background:"#7BD1E3" }}></div>
                                <p style={{textDecoration:'line-through', color:'#666666'}}>3층 시설물 안전 점검 신청</p>
                            </div>
                            <img src="./images/checked.png"></img>
                        </div>
                        <div className={ MainCSS.toDoItemBox }>
                            <div className={ MainCSS.colorAndToDo }>
                                <div className={ MainCSS.colorBox } style={{ background:"#FF9B9B" }}></div>
                                <p style={{textDecoration:'line-through', color:'#666666'}}>3층 시설물 안전 점검 신청</p>
                            </div>
                            <img src="./images/checked.png"></img>
                        </div>
                    </div>
                    
                </div>
            </motion.div>
        </>
    );
}

export default MyCalenderInfo;