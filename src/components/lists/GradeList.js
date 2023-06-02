import LectureCSS from "../../css/LectureInsertModal.module.css";
import { motion } from "framer-motion"
import GradeItem from "../items/GradeItem";

function GradeList ({gradeList}) {

    return (
        <motion.div
            className={ LectureCSS.gradeTable }
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <table>
                <colgroup>
                <col width="5%"/>   {/* No */}
                <col width="10%"/>  {/* 학과 */}
                <col width="5%"/>   {/* 학년 */}
                <col width="10%"/>  {/* 학번 */}
                <col width="5%"/>   {/* 이름 */}
                <col width="5%"/>   {/* 출석 */}
                <col width="5%"/>   {/* 결석 */}
                <col width="5%"/>   {/* 지각 */}
                <col width="7%"/>   {/* 출석 점수 */}
                <col width="7%"/>   {/* 과제 */}
                <col width="7%"/>   {/* 중간 */}
                <col width="7%"/>   {/* 기말 */}
                <col width="7%"/>   {/* 총점 */}
                <col width="5%"/>  {/* 등급 */}
                <col width="5%"/>   {/* 비고 */}
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
                    <GradeItem/>
                </tbody>
            </table>
        </motion.div>
    );
}

export default GradeList;