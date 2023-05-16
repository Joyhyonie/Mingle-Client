/* 행정직원의 '강의 개설' */
import { motion } from "framer-motion"
import CommonCSS from"../../../css/common/Common.module.css"
import LectureRegist from "../../../css/RegistLectureForAdmin.module.css"



function RegistLectureForAdmin () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
       
        
        <div className={LectureRegist.registLectureDiv}>
            <p className={ CommonCSS.pageDirection }>강의 개설 </p>
            <button className={LectureRegist.registLecturebtn}>강의개설</button>
        </div>
        
       


        </motion.div>
    );
}

export default RegistLectureForAdmin;