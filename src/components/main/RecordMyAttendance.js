import { toast } from "react-hot-toast";
import MainCSS from "../../css/Main.module.css";
import { useEffect, useState } from "react";
import RecordStartTimeModal from "../modal/RecordStartTimeModal";
import RecordEndTimeModal from "../modal/RecordEndTimeModal";
import { useDispatch, useSelector } from "react-redux";
import { callMyAttendanceTodayAPI } from "../../apis/AttendanceAPICalls";
import { callGetEmployeeAPI } from "../../apis/EmployeeAPICalls";

function RecordMyAttendance () {

    const dispatch = useDispatch();
    const { attendanceToday } = useSelector(state => state.AttendanceReducer);
    const [recordStartTimeModal, setRecordStartTimeModal] = useState(false);
    const [recordEndTimeModal, setRecordEndTimeModal] = useState(false);

    useEffect(
        () => {
            dispatch(callMyAttendanceTodayAPI());
        },[]
    );

    /* 출퇴근 시각 포맷 함수 */
    const formatTime = (time) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours < 12 ? '오전' : '오후';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;   
    }

    const startTimeClickHandler = () => setRecordStartTimeModal(true);

    /* 퇴근 시각 등록 전, 출근 시각이 존재하는지 확인한 후 퇴근 기록 모달창을 오픈하는 이벤트 함수 */
    const endTimeClickHandler = () => {

        if(attendanceToday && attendanceToday.atdStartTime) { /* 이후에 todayData.empAtdStartTime이 와야함 */
            setRecordEndTimeModal(true);
        } else {
            toast('오늘의 출근 시각을 먼저 기록해주세요!',{ icon: "🥲" });
        }

    }

    return (
        <>
            {/* 출근 기록 모달창 */}
            <div>
                { recordStartTimeModal ?
                    <RecordStartTimeModal setRecordStartTimeModal={setRecordStartTimeModal}/> : null
                }
            </div>

            {/* 퇴근 기록 모달창 */}
            <div>
                { recordEndTimeModal ?
                    <RecordEndTimeModal setRecordEndTimeModal={setRecordEndTimeModal}/> : null
                }
            </div>

            <div className={ MainCSS.recordBox }>
                { attendanceToday && attendanceToday.atdStartTime ?
                (<div>
                    <p>{formatTime(attendanceToday.atdStartTime)}</p>
                    <div
                        onClick={ () => toast('이미 오늘의 출근 시각이 기록되었습니다', {icon :'😇'}) }
                        style={{ background:'#E6E6E6' }}>
                        출근 완료
                    </div>
                </div>) : 
                (<div>
                    <div
                        onClick={ startTimeClickHandler }>
                        출근 기록
                    </div>
                </div>)
                }

                { attendanceToday && attendanceToday.atdEndTime ?
                (<div>
                    <p>{formatTime(attendanceToday.atdEndTime)}</p>
                    <div
                        onClick={ () => toast('이미 오늘의 퇴근 시각이 기록되었습니다', {icon :'😇'}) }
                        style={{ background:'#E6E6E6' }}>
                        퇴근 완료
                    </div>
                </div>) : 
                (<div>
                    <div
                        onClick={ endTimeClickHandler }
                    >    
                        퇴근 기록
                    </div>
                </div>)
                }
            </div>
        </>
    );
}

export default RecordMyAttendance;