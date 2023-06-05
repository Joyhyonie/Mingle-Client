/* 행정직원의 '강의 개설' */
import { motion } from "framer-motion"
import CommonCSS from "../../../css/common/Common.module.css"
import LectureRegist from "../../../css/RegistLectureForAdmin.module.css";
import LectureListCSS from '../../../css/LectureList.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callOpenLectureListAPI, callOpenLectureSearchNameAPI } from "../../../apis/LectureAPICalls";
import PagingBar from "../../../components/common/PagingBar";
import LectureInsertModal from "../../../components/modal/LectureInsertModal";
import OpenLectureSearchBar from "../../../components/common/OpenLectureSearchBar ";
import SearchBarCSS from '../../../css/common/SearchBar.module.css';
import { useSearchParams } from "react-router-dom";



function RegistLectureForAdmin() {


  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const condition = params.get('condition');
  const name = params.get('search');
  const type = "registLectureForAdmin";
  const options = [
    { value: "empName", label: "교수명" },
    { value: "sbjName", label: "교과목명" }
  ];

  const { data, pageInfo, openSearch } = useSelector(state => state.SubjectInfoReducer);
  console.log("getInfo", data);
  console.log("openSearch", openSearch);



  useEffect(
    () => {
      if (name) {
        dispatch(callOpenLectureSearchNameAPI({ search: name, condition: condition, currentPage: currentPage }))
        return;
      }


      dispatch(callOpenLectureListAPI({ currentPage }))
    },
    [currentPage, isModalOpen, isInsertModalOpen, condition, name]
  );

  const onCLickInsert = () => {
    setIsInsertModalOpen(true);
  }







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
        <div className={SearchBarCSS.basic}>
          {<OpenLectureSearchBar options={options} type={type} />}
        </div>

        <table className={LectureListCSS.SubjectListTable}>
          <colgroup>
            <col width="5%" />
            <col width="13%" />
            <col width="5%" />
            <col width="10%" />
            <col width="20%" />
            <col width="5%" />
            <col width="5%" />
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
              <th>담당교수</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {openSearch && openSearch.data ? (
              openSearch.data.map((subject) => (
                <tr key={subject.lecCode}>
                  <td>{subject.lecCode}</td>
                  <td>{subject.subject.department.deptName}</td>
                  <td>{subject.subject.classType}</td>
                  <td>{subject.subject.sbjCode}</td>
                  <td>{subject.subject.sbjName}</td>
                  <td>{subject.subject.score}</td>
                  <td>{subject.employee.empName}</td>
                  <td>{subject.lecName ? "개설완료" : "개설요청"}</td>
                </tr>
              ))
            ) : (
              data &&
              data.map((lec) => (
                <tr key={lec.lecCode}>
                  <td>{lec.lecCode}</td>
                  <td>{lec.subject.department.deptName}</td>
                  <td>{lec.subject.classType}</td>
                  <td>{lec.subject.sbjCode}</td>
                  <td>{lec.subject.sbjName}</td>
                  <td>{lec.subject.score}</td>
                  <td>{lec.employee.empName}</td>
                  <td>{lec.lecName ? "개설완료" : "개설요청"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
        {(openSearch && openSearch.pageInfo) ? (<PagingBar pageInfo={openSearch.pageInfo} setCurrentPage={setCurrentPage} />)
            : (pageInfo && pageInfo) ? (<PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />)
              : null}
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