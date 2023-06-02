/* 행정직원의 '출결 및 성적 관리' */
import { motion } from "framer-motion"
import CommonCSS from '../../../css/common/Common.module.css'
import SearchBarCSS from '../../../css/common/SearchBar.module.css';
import AttendanceList from "../../../components/lists/AttendanceList";
import PagingBar from "../../../components/common/PagingBar";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/common/SearchBar";
import { callLectureListAPI } from "../../../apis/LectureAPICalls";
import { useDispatch, useSelector } from "react-redux";

function StudentAttendanceForAdmin() {


    const [currentPage, setCurrentPage] = useState(1);
    const { data, pageInfo } = useSelector(state => state.SubjectInfoReducer);
    const dispatch = useDispatch();


    console.log("getInfo", data);






    const options = [//프롭스
        { value: "title", name: "주차" },
        { value: "content", name: "1주차" }//어떻게 처리해야할까나

    ];


    useEffect(
        () => {
            /*lectureList APi 호출  () 함수를 전달해줘야 미들웨어에서 호출되고 넘어갈 것. */

            dispatch(callLectureListAPI({ currentPage }))
        },
        [currentPage]
    );


    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={CommonCSS.pageDirection}>출결 및 성적관리</p>
            <div className={SearchBarCSS.basic}>
                {<SearchBar
                    options={options}>
                </SearchBar>}


            </div>
            <div>
                {data && <AttendanceList LectureInfoList={data} />}
            </div>

            <div>
                {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div>




        </motion.div>
    );
}

export default StudentAttendanceForAdmin;