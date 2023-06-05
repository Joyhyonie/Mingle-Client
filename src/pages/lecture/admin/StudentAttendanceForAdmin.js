/* 행정직원의 '출결 및 성적 관리' */
import { motion } from "framer-motion"
import CommonCSS from '../../../css/common/Common.module.css'
import SearchBarCSS from '../../../css/common/SearchBar.module.css';
import AttendanceList from "../../../components/lists/AttendanceList";
import PagingBar from "../../../components/common/PagingBar";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/common/SearchBar";
import { callLectureListAPI, callLectureSearchNameAPI } from "../../../apis/LectureAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';

function StudentAttendanceForAdmin() {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, pageInfo, search } = useSelector(state => state.SubjectInfoReducer);
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const condition = params.get('condition');
    const name = params.get('search');

    console.log("name1", name);
    console.log("getInfo", data);
    console.log("lectureserach", search);
    const type = "lectureStudentAdmin";
    const options = [
        { value: "empName", label: "교수명" },
        { value: "lecName", label: "강의명" }
    ];


    useEffect(
        () => {
            console.log("name2", name);
            if (name) {

                dispatch(callLectureSearchNameAPI({ search: name, condition: condition, currentPage: currentPage }))

            } else {

                dispatch(callLectureListAPI({ currentPage }))
            }
        },
        [currentPage, condition, name]
    );

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={CommonCSS.pageDirection}>출결 및 성적관리</p>
            <div className={SearchBarCSS.basic}>
                {<SearchBar options={options} type={type} />}
            </div>
            <div>

                {search && search.data ? (
                    <AttendanceList LectureInfoList={search.data}/>
                ) : (
                    data && data && <AttendanceList LectureInfoList={data}/>
                )}
            </div>

            <div>
            {(search && search.pageInfo) ? (<PagingBar pageInfo={search.pageInfo} setCurrentPage={setCurrentPage} />)
                    : (pageInfo && pageInfo) ? (<PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />)
                        : null}
            </div>




        </motion.div>
    );
}

export default StudentAttendanceForAdmin;