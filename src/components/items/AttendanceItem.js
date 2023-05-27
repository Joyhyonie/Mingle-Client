import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import buttonCSS from "../../css/Button.module.css";
import { useState } from 'react';
import styled from "styled-components";

function AttendanceItem({ attendance }) {
    //무조건 한단계 거쳐서 프롭스로 받아야지 리스트를 객체처럼 꺼내쓸수 있다. 
    const SelectBoxWrapper = styled.div`    
    // display: flex;
    // flex-grow:1;
  `;

    const IconSVG = styled.svg`
    margin-left: -22px;
    align-self: center;
    width: 12px;
    height: 12px;
  `;
    console.log("attendanceITem 배열이 객체로잘 변환 되었는가", attendance)
    console.log("attendanceITem 배열이 객체로잘 변환 되었는가", attendance.courseCode)

    const navigate = useNavigate();
    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        setAttendanceStatus(selectedOption)
    };

    const [attendanceStatus, setAttendanceStatus] = useState('');



    const clickAttendanceHandler = (attendance) => {


        navigate(`/attendanceDetail/${attendance}`); //출석


    }


    console.log(attendance);
    return (
        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
            onClick={() => clickAttendanceHandler(attendance.courseCode)}
        >

            <td>{attendance.student.stdCode}</td>
            <td>{attendance.student.department.deptName}</td>
            <td>{attendance.student.stdName}</td>

            <td>
                <>
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
                </>
            </td>
            <td><input type="text" value={attendanceStatus} readOnly /></td>


        </motion.tr>
    );
}

export default AttendanceItem;