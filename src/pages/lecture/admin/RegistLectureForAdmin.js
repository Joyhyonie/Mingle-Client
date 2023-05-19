/* 행정직원의 '강의 개설' */
import { motion } from "framer-motion"
import CommonCSS from "../../../css/common/Common.module.css"
import LectureRegist from "../../../css/RegistLectureForAdmin.module.css";
import LectureRegistSearchbar from '../../../layouts/LectureRegistSearchbar.js';
import SearchBarCss from '../../../css/LectureSearchBar.module.css'
import LectureListCSS from '../../../css/LectureList.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callSubjectDelete, callSubjectUpdateAPI, callSubjectsAPI } from "../../../apis/LectureAPICalls";
import { toast } from "react-hot-toast";
import PagingBar from "../../../components/common/PagingBar";
import SubjectUpdateModal from "../../../components/modal/SubjectUpdateModal";
import LectureInsertModal from "../../../components/modal/LectureInsertModal";



function RegistLectureForAdmin () {
  const pageInfo = {startPage: 1, endPage: 10, currentPage:2, maxPage: 20}


  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);


  useEffect(
    () => {
      dispatch(callSubjectsAPI({ currentPage }))
    },
    [currentPage, isModalOpen, isInsertModalOpen]
  );








  const onCLickInsert = () => {
    setIsInsertModalOpen(true);
  }



  //



  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >

      <div className={LectureRegist.registLectureDiv}>
        <p className={CommonCSS.pageDirection}>강의 개설 </p>
        <motion.button className={LectureListCSS.insertButton}
          onClick={onCLickInsert}
          whileHover={{ scale: 1.05 }}>강의개설</motion.button>

      </div>
      <div className={LectureListCSS.lectureList}>

        <div className={LectureRegist.lecturesearchbar}>
          <LectureRegistSearchbar></LectureRegistSearchbar>
          <button className={SearchBarCss.searchBarBtn}>검색</button>
        </div>
        <table className={LectureListCSS.SubjectListTable}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>강의번호</th>
              <th>개설학과</th>
              <th>이수 구분</th>
              <th>교과목 코드</th>
              <th>교과목명</th>
              <th>학점</th>
              <th>학년</th>
              <th>담당교수</th>
              <th>상태</th>
              <th></th> <br />
              <br></br>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
        <div>
          {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
        </div>

        {isInsertModalOpen && (
          <LectureInsertModal
            setIsInsertModalOpen={setIsInsertModalOpen} />
        )}
      </div>



    </motion.div>
  );
}

export default RegistLectureForAdmin;