import LectureCSS from "../../css/LectureInsertModal.module.css";
import { motion } from "framer-motion"
import GradeItem from "../items/GradeItem";

function GradeList ({courseList}) {

    return (
        <motion.div
            className={ LectureCSS.gradeTable }
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <table>
                <colgroup>
                <col width="5%"/>
                <col width="10%"/>
                <col width="5%"/>
                <col width="10%"/>
                <col width="5%"/>
                <col width="5%"/> 
                <col width="5%"/>
                <col width="5%"/>
                <col width="7%"/>
                <col width="7%"/> 
                <col width="7%"/>
                <col width="7%"/>
                <col width="7%"/> 
                <col width="5%"/> 
                <col width="5%"/> 
                </colgroup>
                <thead>
                <tr>
                    <th rowspan="2">NO</th>
                    <th rowspan="2">학과</th>
                    <th rowspan="2">학년</th>
                    <th rowspan="2">학번</th>
                    <th rowspan="2">이름</th>
                    <th colspan="3">출결현황</th>
                    <th colspan="5">점수</th>
                    <th rowspan="2">등급</th>
                    <th rowspan="2">비고</th>
                </tr>
                <tr>
                    <th>출석</th>
                    <th>결석</th>
                    <th>지각</th>
                    <th>출석 점수</th>
                    <th>과제 점수</th>
                    <th>중간 점수</th>
                    <th>기말 점수</th>
                    <th>총점</th>
                </tr>
                </thead>
                <tbody>
                { Array.isArray(courseList)
                && courseList.map((course, index) => <GradeItem key={ course.courseCode } course={ course } index={ index + 1 }/>) 
                }
                </tbody>
            </table>
        </motion.div>
    );
}

export default GradeList;