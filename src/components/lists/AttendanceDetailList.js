import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import AttendanceItem from '../items/AttendanceItem';
import SearchBarCss from "../../css/common/SearchBar.module.css";
import AteendanceSearchBar from "../../components/common/AteendanceSearchBar";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callCourceStdListAPI, callNewAttendanceListAPI } from "../../apis/LectureAPICalls";
import { useNavigate, useParams } from 'react-router-dom';

function AttendanceDetailList({ attendanceDetailList }) {//매개객체 변수가 api에 넣을 것인가?

    const options = [
        { value: "sbjName", label: "과목명" },
        { value: "deptName", label: "학과명" }

    ];
    const { attendance, newAttendance } = useSelector(state => state.SubjectInfoReducer);
    const { lecCode } = useParams();
    const SelectBoxWrapper = styled.div`
    // display: flex;
    // flex-grow:1;
  `;

    console.log("여기는 출첵attendance", attendance);
    console.log("여기는뉴뉴뉴 newAttendance", newAttendance);


    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
        setAttendanceStatus(selectedOption)
    };
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const dispatch = useDispatch();




    useEffect(
        () => {
            console.log("코드코드코드코드", lecCode);
            dispatch(callCourceStdListAPI({ lecCode }));
            dispatch(callNewAttendanceListAPI({ lecCode }));


        }, []);





    return (<motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >

        <div className={SearchBarCss.basic}>
            {<AteendanceSearchBar
                options={options}>
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


                {Array.isArray(attendance)
                    && attendance.map(attendance => <AttendanceItem key={attendance.courseCode} attendance={attendance} />)
                }



            </tbody>
        </table>


    </motion.div>
    );
}

export default AttendanceDetailList;