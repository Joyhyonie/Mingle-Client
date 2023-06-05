import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import LectureItem from '../items/LectureItem';

function AttendanceList({ LectureInfoList }) {

    console.log("AttendanceList :", LectureInfoList);

    return (<motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
        <table className={BoardCSS.boardTable}>
            <colgroup>

                <col width="10%" />
                <col width="35%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>

                    <th>강의번호</th>
                    <th>강의명</th>
                    <th>기간</th>
                    <th>담임 교수</th>
                    <th>출석 및 성적 조회</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(LectureInfoList)
                    && LectureInfoList.map(lecture => <LectureItem key={lecture.lecCode} lecture={lecture} />)
                }

            </tbody>
        </table>


    </motion.div>
    );
}

export default AttendanceList;