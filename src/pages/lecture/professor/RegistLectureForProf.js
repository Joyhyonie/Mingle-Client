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
import { callMyLectureCallAPI, callSearchName } from "../../../apis/LectureAPICalls";
import { useState } from "react";
import LecPlanModal from "../../../components/modal/LecPlanModal";
import { useSearchParams } from "react-router-dom";

function RegistLectureForProf () {

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectLecture, setSelectLecture] = useState();
  const {myLecture, searchName, lecplan} = useSelector(state => state.SubjectInfoReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [params] = useSearchParams();
  const condition = params.get('condition');
  const name = params.get('search');


    const type = "registLecture";
    const options = [
        { value: "sbjName", label: "과목명" },
        { value: "lecName", label: "강의명" }
      ];
    
      const openModal = (lecture) => {
        setSelectLecture(lecture);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectLecture(null);
      };


    useEffect(
      ()=>{
        if(name){
          dispatch(callSearchName({search : name, condition: condition, currentPage : currentPage }));
          return;
        }
        dispatch(callMyLectureCallAPI(currentPage));
      },
      [currentPage,name,condition,lecplan]
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

              {
                  (searchName && searchName.data) ? (
                    searchName.data.map((lecture) => (
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
                                <td><button className={LectureCSS.longButton} onClick={()=> openModal(lecture)}>강의계획서작성</button></td>
                                ): <td><button className={LectureCSS.longButton} onClick={()=> openModal(lecture)}>강의계획서보기</button></td> }

                    </tr>
                            ))
                        ) : (
                            (myLecture && myLecture.data) && (
                              myLecture.data.map((lecture) => (
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
                                <td><button className={LectureCSS.button} onClick={()=> openModal(lecture)}>강의계획서 작성</button></td>
                                ): <td><button className={LectureCSS.button} onClick={()=> openModal(lecture)}>강의계획서 조회</button></td> }
                              </tr>
                            ))
                            )
                        )
                        }
              </tbody>
            </table>
          {isModalOpen && (
              <LecPlanModal 
              lecture={selectLecture}
              closeModal={closeModal} />
              
          )}


            <div>
            { (searchName && searchName.pageInfo) ? (<PagingBar pageInfo={searchName.pageInfo} setCurrentPage={setCurrentPage} /> ) 
                : (myLecture && myLecture.pageInfo) ? (<PagingBar pageInfo={myLecture.pageInfo} setCurrentPage={setCurrentPage} /> )
                : null }
            </div>
         
          </div>
        </motion.div>
      );
    }

export default RegistLectureForProf;