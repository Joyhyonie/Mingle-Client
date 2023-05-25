import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import AttendanceItem from '../items/AttendanceItem';
import SearchBarCss from "../../css/common/SearchBar.module.css";
import SearchBar from "../../components/common/SearchBar";

function AttendanceDetailList({ attendanceDetailList }) {//매개객체 변수가 api에 넣을 것인가?

    const options = [
        { value: "sbjName", label: "과목명" },
        { value: "deptName", label: "학과명" }
    ];


    console.log("AttendanceDetailList :", attendanceDetailList);
    return (<motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >

        <div className={SearchBarCss.basic}>
            {<SearchBar
                options={options}>
            </SearchBar>}
        </div>
        <table className={BoardCSS.boardTable}>
            <colgroup>
                <col width="20%" />
                <col width="30%" />
                <col width="15%" />
                <col width="10%" />
                <col width="10%" />

            </colgroup>
            <thead>
                <tr>
                    <th>학번</th>
                    <th>학과명</th>
                    <th>성명</th>
                    <th>출석 입력</th>
                    <th>출석 상태</th>

                </tr>
            </thead>
            <tbody>
                {Array.isArray(attendanceDetailList)
                    && attendanceDetailList.map(attendance => <AttendanceItem key={attendance.lectureCode} attendance={attendance} />)
                }

                {/* 아래는 dummy ----------------------------------------------------------- */}

                {Array.isArray(attendanceDetailList)
                    && attendanceDetailList.map(attendance => <AttendanceItem key={attendance.lectureCode} attendance={attendance} />)
                }
                {Array.isArray(attendanceDetailList)
                    && attendanceDetailList.map(attendance => <AttendanceItem key={attendance.lectureCode} attendance={attendance} />)
                }
                {Array.isArray(attendanceDetailList)
                    && attendanceDetailList.map(attendance => <AttendanceItem key={attendance.lectureCode} attendance={attendance} />)
                }
                {Array.isArray(attendanceDetailList)
                    && attendanceDetailList.map(attendance => <AttendanceItem key={attendance.lectureCode} attendance={attendance} />)
                }
            </tbody>
        </table>


    </motion.div>
    );
}

export default AttendanceDetailList;