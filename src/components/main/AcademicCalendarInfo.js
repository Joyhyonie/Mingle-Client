import { motion } from "framer-motion"
import MainCSS from "../../css/Main.module.css"
import { useEffect, useState } from "react"
import AcScheduleDetailModal from "../modal/AcScheduleDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { callAcScheduleByDateAPI } from "../../apis/ScheduleAPICalls";

function AcademicCalendarInfo ({dateInAcCal}) {

    const dispatch = useDispatch();
    const { acSchedule } = useSelector(state => state.ScheduleReducer);
    const [acScheduleDetailModal, setAcScheduleDetailModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);         // 일정 상세 모달창에 클릭된 일정의 정보를 담아 보내기 위한 state

    useEffect(
        () => {
            /* 학사 일정 조회 API 호출 */
            const date = new Date(dateInAcCal);
            const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '-');
            console.log("MyCalendarInfo의 formattedDate => ", formattedDate);
            dispatch(callAcScheduleByDateAPI(formattedDate));
        },[]
    );

    /* 학사일정 종료일의 형식 포맷용 함수 */
    const formatDate = (scheEndDate) => {
        const date = new Date(scheEndDate);
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    /* 클릭된 날짜의 월/일/요일을 변경시키는 이벤트 함수 */
    const clickedDateHandler = () => {
        const clickedDate = new Date(dateInAcCal);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${clickedDate.getMonth() + 1}월 ${clickedDate.getDate()}일 ${days[clickedDate.getDay()]}요일`;
    }

    return (
        <>
            {/* 학사일정 상세 모달창 */}
            <div>
                { acScheduleDetailModal ?
                    (<AcScheduleDetailModal setAcScheduleDetailModal={setAcScheduleDetailModal} selectedSchedule={selectedSchedule}/>) 
                    : null
                }
            </div>

            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            >
                <div className={ MainCSS.ScheduleInfoBox }>
                    <div className={ MainCSS.dateBox }>
                        <p>{clickedDateHandler()}</p>
                    </div>
                    <div className={ MainCSS.academicItemList }>
                        { acSchedule && acSchedule.map(schedule => (
                            <div className={ MainCSS.academicItemBox }>
                                <div>
                                    ~ {formatDate(schedule.scheEndDate)}
                                </div>
                                <p
                                    onClick={ () => {setAcScheduleDetailModal(true); setSelectedSchedule(schedule);} }
                                >
                                    { schedule.scheName.length > 20 ? schedule.scheName.slice(0, 20) + '...' : schedule.scheName }
                                </p>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default AcademicCalendarInfo;