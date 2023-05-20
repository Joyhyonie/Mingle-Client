import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import buttonCSS from "../../css/Button.module.css";
import { useState } from 'react';
import styled from "styled-components";

function AttendanceItem({ attendance }) {

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


    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        setAttendanceStatus(selectedOption)
    };

    const [attendanceStatus, setAttendanceStatus] = useState('');




    console.log(attendance);
    return (
        <motion.tr
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <td>{attendance.studentCode}</td>
            <td>{attendance.deptName}</td>
            <td>{attendance.deptName}</td>

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


        </motion.tr>
    );
}

export default AttendanceItem;