/* 교수의 '강의 개설' */
import { motion } from "framer-motion"
import PagingBar from "../../../components/common/PagingBar";
import CommonCSS from '../../../css/common/Common.module.css';
import SearchBarCss from "../../../css/common/SearchBar.module.css";
import SearchBar from "../../../components/common/SearchBar";
import LectureCSS from '../../../css/ProfessorLecture.module.css'
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMyLectureCallAPI } from "../../../apis/LectureAPICalls";
import { useState } from "react";

function RegistLectureForProf () {

  const dispatch = useDispatch();
  const {myLecture} = useSelector(state => state.SubjectInfoReducer);
  const [currentPage, setCurrentPage] = useState(1);

    const type = "registLecture";
    const options = [
        { value: "sbjName", label: "과목명" },
        { value: "deptName", label: "학과명" }
      ];
    
    useEffect(
      ()=>{
        dispatch(callMyLectureCallAPI(currentPage));
      },
      [currentPage]
    )
    
      
      return (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
          <div className={LectureCSS.container}>
          <div>
          <p className={ CommonCSS.pageDirection }>강의관리 ▸ 강의개설</p>
          </div>
          </div>
          <div className={LectureCSS.SubjectList}>
          <div className={SearchBarCss.basic}>
              {<SearchBar options={options} type={type} />}
            </div>
            <table className={LectureCSS.SubjectListTable}>
              <colgroup>
                <col width="8%" />
                <col width="8%" />
                <col width="8%" />
                <col width="10%" />
                <col width="20%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>강의번호</th>
                  <th>개설학과</th>
                  <th>이수구분</th>
                  <th>과목명</th>
                  <th>강의명</th>
                  <th>학점</th>
                  <th>개설기간</th>
                  <th>담당교수</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myLecture && (
                  myLecture.data.map((lecture)=>(
                    <tr key={lecture.lecCode}>
                      <td>{lecture.lecCode}</td>
                      <td>{lecture.subject.department.deptName}</td>
                      <td>{lecture.subject.classType}</td>
                      <td>{lecture.subject.sbjName}</td>
                      <td>{lecture.lecName ? lecture.lecName : "미정"}</td>
                      <td>{lecture.subject.score}</td>
                      <td>{lecture.lecYear}</td>
                      <td>{lecture.employee.empName}</td>
                      {lecture.lecName == null ? (
                                <td><button className={LectureCSS.button}>강의계획서작성</button></td>
                                ): <td><button className={LectureCSS.button}>강의계획서보기</button></td> }
                    </tr>
                  ))
                )}
              
              </tbody>
            </table>
            <div>
            { myLecture && (<PagingBar pageInfo={ myLecture.pageInfo } setCurrentPage={ setCurrentPage } />) }
            </div>
         
          </div>
        </motion.div>
      );
    }

export default RegistLectureForProf;