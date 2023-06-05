import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import LectureItem from '../items/LectureItem';

function AttendanceList({ LectureInfoList}) {

    console.log("AttendanceList :", LectureInfoList);
    const index = 0;

    return (<motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
        <table className={BoardCSS.boardTable}>
            <colgroup>

                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="20%" />
                <col width="10%" />
                <col width="10%" />
                <col width="5%" />
                <col width="5%" />
            </colgroup>
            <thead>
                <tr>

                    <th>No</th>
                    <th>강의번호</th>
                    <th>과목명</th>
                    <th>강의명</th>
                    <th>기간</th>
                    <th>담임 교수</th>
                    <th>출결</th>
                    <th>성적</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(LectureInfoList)
                    && LectureInfoList.map((lecture, index) => <LectureItem key={lecture.lecCode} lecture={lecture} index={index+1}/>)
                }

            </tbody>
        </table>


    </motion.div>
    );
}

export default AttendanceList;