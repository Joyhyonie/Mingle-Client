import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import buttonCSS from "../../css/Button.module.css";
import { useState } from 'react';
import styled from "styled-components";
import StdAttendanceUpdateModal from "../../components/modal/StdAttendanceUpdateModal";


function AttendanceItem({ attendance }) {
    //무조건 한단계 거쳐서 프롭스로 받아야지 리스트를 객체처럼 꺼내쓸수 있다. 
    const SelectBoxWrapper = styled.div`    
    // display: flex;
    // flex-grow:1;
  `;

    const { newAttendance } = useSelector(state => state.SubjectInfoReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const IconSVG = styled.svg`
    margin-left: -22px;
    align-self: center;
    width: 12px;
    height: 12px;
  `;
    console.log("newAttendance", newAttendance)
    console.log("attendanceITem 배열이 객체로잘 변환 되었는가", attendance)
    console.log("attendanceITem 배열이 객체로잘 변환 되었는가", attendance.courseCode)

    const navigate = useNavigate();
    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        setAttendanceStatus(selectedOption)
    };

    const [attendanceStatus, setAttendanceStatus] = useState('');

    const matchingAttendance = Array.isArray(newAttendance) && newAttendance.find(item => item.course.student.stdCode === attendance.student.stdCode);
    console.log("matchingAttendance", matchingAttendance);




    const openModal = () => {

        setIsModalOpen(true);
    };
    // const closeModal = () => {
    //     setSelectedSubject(null);
    //     setIsModalOpen(false);
    // };




    console.log(attendance);
    return (
        <>
            <motion.tr
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
                onClick={() => openModal()}
            >
                {matchingAttendance && (
                    <>
                        <>
                            <td>{matchingAttendance.course.student.stdCode}</td>
                            <td>{matchingAttendance.course.student.department.deptName}</td>
                            <td>{matchingAttendance.course.student.stdName}</td>
                            <td><input type="text" style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }} value={matchingAttendance.stdAtdStatus} readOnly /></td>
                        </>
                    </>

                )}
                {/* ) :
                    <>
                        <td>가나</td>
                        <td>가나</td>
                        <td>가나</td>

                    </>} */}

                {/* <td>
                <>
                    <select onChange={handleSelectChange}>
                        <option value="출석">출석</option>
                        <option value="결석">결석</option>
                        <option value="지각">지각</option>
                    </select>
                </>
            </td> */}



            </motion.tr>
            {isModalOpen && (
                <StdAttendanceUpdateModal
                    subject={matchingAttendance}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </>
    );
}

export default AttendanceItem;