import BoardCSS from '../../css/Board.module.css';
import { motion } from "framer-motion"
import AttendanceItem from '../items/AttendanceItem';
import SearchBarCss from "../../css/common/SearchBar.module.css";
import AteendanceSearchBar from "../../components/common/AteendanceSearchBar";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { callCourceStdListAPI } from "../../apis/LectureAPICalls";
import { useParams } from 'react-router-dom';
import CommonCSS from '../../css/common/Common.module.css'

function AttendanceDetailList({ attendanceDetailList }) {


    const { attendance } = useSelector(state => state.SubjectInfoReducer);
    const { lecCode } = useParams();
    const SelectBoxWrapper = styled.div`
    // display: flex;
    // flex-grow:1;
  `;
    const dispatch = useDispatch();

    useEffect(
        () => {

            dispatch(callCourceStdListAPI({ lecCode }));


        },
        []);


    const option = attendance && attendance.lectureDTO[0];





    return (<motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }} style={{ width: "100%" }}
    ><p className={CommonCSS.pageDirection}>출결 및 성적관리 ▸ 출결관리 </p>

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