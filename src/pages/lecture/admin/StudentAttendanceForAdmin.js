/* 행정직원의 '출결 및 성적 관리' */
import { motion } from "framer-motion"
import CommonCSS from '../../../css/common/Common.module.css'
import SearchBarCSS from '../../../css/common/SearchBar.module.css';
import LectureList from "../../../components/lists/AttendanceList";
import PagingBar from "../../../components/common/PagingBar";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/common/SearchBar";

function StudentAttendanceForAdmin() {
    /* (임시용 데이터) */
    const lectureInfoList = [{ lectureNo: 1, lectureCode: 87512, lectureName: '거시경제학', lectureYear: '2023', lectureSeason: 2, empCode: 12345, empName: '최지원', lectureAttendence: '출석' },
    { lectureNo: 2, lectureCode: 137512, lectureName: '미시경제학', lectureYear: '2023', lectureSeason: 2, empCode: 42345, empName: '최지원', lectureAttendence: '출석' },

    ]
    console.log("studentAttenace :", lectureInfoList);

    const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }


    const [currentPage, setCurrentPage] = useState(1);

    const options = [//프롭스
        { value: "title", name: "주차" },
        { value: "content", name: "1주차" }//어떻게 처리해야할까나

    ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={CommonCSS.pageDirection}>출결 및 성적관리</p>
            <div className={SearchBarCSS.basic}>
                {<SearchBar
                    options={options}>
                </SearchBar>}

                {/* <SearchAndListLayout options={options}/> */}
            </div>
            <div>
                {lectureInfoList && <LectureList LectureInfoList={lectureInfoList} />}
            </div>

            <div>
                {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
            </div>


        </motion.div>
    );
}

export default StudentAttendanceForAdmin;