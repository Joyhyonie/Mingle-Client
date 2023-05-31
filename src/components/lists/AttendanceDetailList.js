import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import AttendanceItem from '../items/AttendanceItem';
import SearchBarCss from "../../css/common/SearchBar.module.css";
import AteendanceSearchBar from "../../components/common/AteendanceSearchBar";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callCourceStdListAPI, callLectureCountAPI, callNewAttendanceListAPI } from "../../apis/LectureAPICalls";
import { useNavigate, useParams } from 'react-router-dom';

function AttendanceDetailList({ attendanceDetailList }) {//매개객체 변수가 api에 넣을 것인가?


    const { attendance, newAttendance, lecCount } = useSelector(state => state.SubjectInfoReducer);
    const { lecCode } = useParams();
    const SelectBoxWrapper = styled.div`
    // display: flex;
    // flex-grow:1;
  `;


    console.log("여기는 출첵attendance", attendance);
    // console.log("여기는 출첵attendance&&&", attendance && attendance.lecturDTO.lecCount)

    // console.log("여기는뉴뉴뉴 newAttendance", newAttendance);
    // console.log("여기는뉴뉴뉴 lecCount", lecCount);


    // const handleSelectChange2 = (event) => {
    //     const selectedOption2 = event.target.value;
    //     console.log('Selected option:', selectedOption2);
    //     setAttendanceStatus2(selectedOption2)
    // };



    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        setAttendanceStatus(selectedOption)
    };
    const [attendanceStatus, setAttendanceStatus] = useState('');
    // const [attendanceStatus2, setAttendanceStatus2] = useState('');
    const dispatch = useDispatch();





    useEffect(
        () => {
            console.log("코드코드코드코드", lecCode);
            dispatch(callCourceStdListAPI({ lecCode }));
            //  dispatch(callNewAttendanceListAPI({ lecCode }));
            //   dispatch(callLectureCountAPI({ lecCode }))


        },
        []);

    console.log("sisisisisidjsfhdkㄹㄴ아ㅓㅁ로나얼", attendance && attendance.lectureDTO[0]);
    const option = attendance && attendance.lectureDTO[0];




    return (<motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >

        <div className={SearchBarCss.basic}>
            {<AteendanceSearchBar
                options={option && option}>
            </AteendanceSearchBar>}
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
                {(attendance && attendance.data) && (
                    attendance.data.map((attendan) => (
                        <tr>
                            <td>{attendan.stdAtdCode}</td>
                        </tr>
                    ))
                )}




                {Array.isArray(attendance?.courseStudentList)
                    && attendance?.courseStudentList?.map((attendance) => <AttendanceItem key={attendance.student.stdCode} attendance={attendance} />)
                }
            </tbody>
        </table>


    </motion.div>
    );
}

export default AttendanceDetailList;