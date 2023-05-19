import ChangeSchedule from "../components/main/ChangeSchedule";
import BoardPreview from "../components/main/BoardPreview";
import RecordMyAttendance from "../components/main/RecordMyAttendance";
import { motion } from "framer-motion"
import MainCSS from "../css/Main.module.css"
import MyCalendar from "../components/main/MyCalendar";
import AcademicCalendar from "../components/main/AcademicCalendar";
import AcademicCalendarInfo from "../components/main/AcademicCalendarInfo";
import MyCalendarInfo from "../components/main/MyCalendarInfo";
import { useState } from "react";


function MainPageLayout () {

    const [isMyCalendar, setIsMyCalendar] = useState(true);             // 사용자가 선택한 캘린더를 관리하는 state
    const [dateInMyCal, setDateInMyCal] = useState(new Date());         // 나의 일정에서 선택된 날짜를 관리하는 state
    const [dateInAcCal, setDateInAcCal] = useState(new Date());         // 학사 일정에서 선택된 날자를 관리하는 state

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            
            <div className={ MainCSS.flex }>
                <div>
                    <div className={ MainCSS.changeSchedule }>
                        <ChangeSchedule isMyCalendar={isMyCalendar} setIsMyCalendar={setIsMyCalendar}/>
                    </div>
                    <div className={ MainCSS.calendarBox }>
                        { isMyCalendar ? 
                            <MyCalendar dateInMyCal={dateInMyCal} setDateInMyCal={setDateInMyCal}/> 
                            : <AcademicCalendar dateInAcCal={dateInAcCal} setDateInAcCal={setDateInAcCal}/>
                        }
                    </div>
                </div>
                <div>
                    <div className={ MainCSS.calendarInfoBox }>
                        { isMyCalendar ? 
                            <MyCalendarInfo dateInMyCal={dateInMyCal}/> : <AcademicCalendarInfo dateInAcCal={dateInAcCal}/>
                        }
                    </div>
                    <div className={ MainCSS.boardPreview }>
                        <BoardPreview/>
                    </div>
                    <div className={ MainCSS.recordMyAttendance }>
                        <RecordMyAttendance/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default MainPageLayout;