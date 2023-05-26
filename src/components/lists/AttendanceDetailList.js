import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import AttendanceItem from '../items/AttendanceItem';
import SearchBarCss from "../../css/common/SearchBar.module.css";
import SearchBar from "../../components/common/SearchBar";
import styled from "styled-components";
import { useState } from 'react';

function AttendanceDetailList({ attendanceDetailList }) {//매개객체 변수가 api에 넣을 것인가?

    const options = [
        { value: "sbjName", label: "과목명" },
        { value: "deptName", label: "학과명" }

    ];

    const SelectBoxWrapper = styled.div`
    // display: flex;
    // flex-grow:1;
  `;

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        setAttendanceStatus(selectedOption)
    };
    const [attendanceStatus, setAttendanceStatus] = useState('');




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
                <th>201301044</th>
                <th>경영학과</th>
                <th>이현재</th>
                <td>
                    <SelectBoxWrapper>
                        <select onChange={handleSelectChange}>
                            <option value="출석">출석</option>
                            <option value="결석">결석</option>
                            <option value="지각">지각</option>
                        </select>
                        {/* <IconSVG
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 14L16 6H4L10 14Z"
                            fill="#1A1A1A"
                        />
                    </IconSVG> */}
                    </SelectBoxWrapper>
                </td>
                <td><input type="text" value={attendanceStatus} readOnly /></td>

                {/* {Array.isArray(attendanceDetailList)
                    && attendanceDetailList.map(attendance => <AttendanceItem key={attendance.lectureCode} attendance={attendance} />)
                } */}

                {/* 아래는 dummy ----------------------------------------------------------- */}

                {/* {Array.isArray(attendanceDetailList)
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
                } */}
            </tbody>
        </table>


    </motion.div>
    );
}

export default AttendanceDetailList;