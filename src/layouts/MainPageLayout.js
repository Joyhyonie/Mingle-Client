import ChangeSchedule from "../components/main/ChangeSchedule";
import BoardPreview from "../components/main/BoardPreview";
import RecordMyAttendance from "../components/main/RecordMyAttendance";
import { motion } from "framer-motion"
import MainCSS from "../css/Main.module.css"
import MyCalender from "../components/main/MyCalender";
import AcademicCalender from "../components/main/AcademicCalender";
import AcademicCalenderInfo from "../components/main/AcademicCalenderInfo";
import MyCalenderInfo from "../components/main/MyCalenderInfo";
import { useState } from "react";


function MainPageLayout () {

    /* 사용자가 선택한 캘린더를 관리하는 state */
    const [isMyCalender, setIsMyCalender] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            
            <div className={ MainCSS.flex }>
                <div>
                    <div className={ MainCSS.changeSchedule }>
                        <ChangeSchedule isMyCalender={isMyCalender} setIsMyCalender={setIsMyCalender}/>
                    </div>
                    <div className={ MainCSS.calenderBox }>
                        { isMyCalender ? 
                            <MyCalender/> 
                            : <AcademicCalender/>
                        }
                    </div>
                </div>
                <div>
                    <div className={ MainCSS.calenderInfoBox }>
                        { isMyCalender ? 
                            <MyCalenderInfo/> : <AcademicCalenderInfo/>
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