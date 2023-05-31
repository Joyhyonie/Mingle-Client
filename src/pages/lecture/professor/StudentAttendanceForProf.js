/* 교수의 '출결 및 성적 관리' */
import { motion } from "framer-motion"
import PagingBar from "../../../components/common/PagingBar";
import CommonCSS from '../../../css/common/Common.module.css';
import SearchBarCss from "../../../css/common/SearchBar.module.css";
import SearchBar from "../../../components/common/SearchBar";
import LectureCSS from '../../../css/ProfessorLecture.module.css';
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLecNameMyLecture } from "../../../apis/LectureAPICalls";
import { useState } from "react";

function StudentAttendanceForProf () {


  const dispatch = useDispatch();
  const type = "studentAttendance";
  const [currentPage, setCurrentPage] = useState(1);
  const {lecName} = useSelector(state => state.SubjectInfoReducer);
  console.log(lecName);
  const options = [
        { value: "sbjName", label: "과목명" },
        { value: "deptName", label: "학과명" }
  ];
    
    useEffect(
      ()=>{
        dispatch(callLecNameMyLecture(currentPage))
      },
      [currentPage]
    )
    
      
      return (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
          <div className={LectureCSS.container}>
          <div>
          <p className={ CommonCSS.pageDirection }>강의관리 ▸ 출결 및 성적관리</p>
          </div>
          </div>
          <div className={LectureCSS.SubjectList}>
          <div className={SearchBarCss.basic}>
              {<SearchBar options={options} type={type} />}
            </div>
            <table className={LectureCSS.SubjectListTable}>
              <colgroup>
                <col width="10%" />
                <col width="10%" />
                <col width="40%" />
                <col width="20%" />
                <col width="10%" />
                <col width="5%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>강의번호</th>
                  <th>강의명</th>
                  <th>단위기간</th>
                  <th>교수</th>
                  <th>출결</th>
                  <th>성적</th>
                </tr>
              </thead>
              <tbody>
              {lecName && (
                  lecName.data.map((lecture,index)=>(
                    <tr key={lecture.lecCode}>
                      <td>{index+1}</td>
                      <td>{lecture.lecCode}</td>
                      <td>{lecture.lecName}</td>
                      <td>{lecture.lecYear}</td>
                      <td>{lecture.employee.empName}</td>
                      <td><button className={LectureCSS.button}>출결</button></td>
                      <td><button className={LectureCSS.button}>출결</button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div>
              { lecName && (<PagingBar pageInfo={ lecName.pageInfo } setCurrentPage={ setCurrentPage } />) }
            </div>
         
          </div>
        </motion.div>
      );
    }

export default StudentAttendanceForProf;