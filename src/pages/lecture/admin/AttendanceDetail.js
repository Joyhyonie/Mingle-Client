/* 해당 강의코드에 따른 출결관리' */
import { motion } from "framer-motion"
import CommonCSS from '../../../css/common/Common.module.css'
import SearchAttendanceLayout from '../../../layouts/SearchAndListLayout';
import SearchBarCSS from '../../../css/common/SearchBar.module.css';



function AttendanceDetail () {
    const options = [//프롭스
    { value: "title", name: "주차" },
    { value: "content", name: "1주차" }//어떻게 처리해야할까나
   ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <p className={ CommonCSS.pageDirection }>강의개설 ▸ 출결 및 성적관리 ▸ 출석 </p>
        <div className={ SearchBarCSS.basic }>
                <SearchAttendanceLayout options={options}/>
            </div>   
        </motion.div>
    );
}

export default AttendanceDetail;