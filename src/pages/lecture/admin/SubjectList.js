/* 행정직원의 '과목 관리' */
import { motion } from "framer-motion"
import SubjectListCSS from '../../../css/SubjectList.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSubjectDelete, callSubjectSearchName, callSubjectsAPI } from "../../../apis/LectureAPICalls";
import SubjectUpdateModal from "../../../components/modal/SubjectUpdateModal";
import SubjectInsertModal from "../../../components/modal/SubjectInsertModal";
import { toast } from "react-hot-toast";
import PagingBar from "../../../components/common/PagingBar";
import CommonCSS from '../../../css/common/Common.module.css';
import SearchBarCss from "../../../css/common/SearchBar.module.css";
import SearchBar from "../../../components/common/SearchBar";
import { useSearchParams } from "react-router-dom";

function SubjectList() {

  const dispatch = useDispatch();
  const type = "subject";
  const [currentPage, setCurrentPage] = useState(1);
  const {subjects,search} = useSelector((state) => state.SubjectReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const {delete1} = useSelector(state => state.SubjectReducer);
  const [params] = useSearchParams();
  const condition = params.get('condtion');
  const name = params.get('search');


  const options = [
    { value: "sbjName", label: "과목명" },
    { value: "deptName", label: "학과명" }
  ];

  useEffect(
    ()=>{
      if(name){
        dispatch(callSubjectSearchName({search : name, condition: condition, currentPage : currentPage }))
        return;
      }
      dispatch(callSubjectsAPI({currentPage}))
    },
    [currentPage,isModalOpen,isInsertModalOpen,checkedItems,delete1,name,condition]
  );

  const openModal = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedSubject(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== value));
    }
  }
  
  const onClickDelete = () => {
    if(checkedItems.length === 0){
      toast.error("과목을 선택해주세요");
      return;
    }
    dispatch(callSubjectDelete(checkedItems));
    toast.success("과목이 삭제 되었습니다.");
    setCheckedItems([]);
  }

  const onCLickInsert = () => {
    setIsInsertModalOpen(true);
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <div className={SubjectListCSS.container}>
      <div>
      <p className={ CommonCSS.pageDirection }>과목관리 ▸ 과목관리</p>
      </div>
        <motion.button className={SubjectListCSS.deleteButton}
         onClick={onClickDelete}
         whileHover={{scale:1.05}}>선택 삭제</motion.button>
        <motion.button className={SubjectListCSS.insertButton}        
         onClick={onCLickInsert}
         whileHover={{scale:1.05}}>과목 등록</motion.button>
      </div>
      <div className={SubjectListCSS.SubjectList}>
      <div className={SearchBarCss.basic}>
          {<SearchBar options={options} type={type} />}
        </div>
        <table className={SubjectListCSS.SubjectListTable}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="40%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>과목코드</th>
              <th>학과명</th>
              <th>과목명</th>
              <th>이수구분</th>
              <th>학점</th>
              <th></th> <br />
              <br></br>
            </tr>
          </thead>
          <tbody>
          {
             (search && search.data) ? (
              search.data.map((subject) => (
                <tr key={subject.sbjCode}>
                <td><input type="checkbox" value={subject.sbjCode} onChange={handleChange}/></td>
                <td>{subject.sbjCode}</td>
                <td>{subject.department.deptName}</td>
                <td>{subject.sbjName}</td>
                <td>{subject.classType}</td>
                <td>{subject.score}</td>
                <td><button 
                onClick={()=> openModal(subject)}>수정</button></td>
              </tr>
                  ))
                ) : (
                      (subjects && subjects.data) && (
                        subjects.data.map((subject) => (
                        <tr key={subject.sbjCode}>
                          <td><input type="checkbox" value={subject.sbjCode} onChange={handleChange}/></td>
                          <td>{subject.sbjCode}</td>
                          <td>{subject.department.deptName}</td>
                          <td>{subject.sbjName}</td>
                          <td>{subject.classType}</td>
                          <td>{subject.score}</td>
                          <td><button 
                               onClick={()=> openModal(subject)}>수정</button></td>
                        </tr>
                 ))
                )
              )
             } 
          </tbody>
        </table>
        <div>
        { (search && search.pageInfo) ? (<PagingBar pageInfo={search.pageInfo} setCurrentPage={setCurrentPage} /> ) 
            : (subjects && subjects.pageInfo) ? (<PagingBar pageInfo={subjects.pageInfo} setCurrentPage={setCurrentPage} /> )
            : null }
        </div>
        {isModalOpen && (
        <SubjectUpdateModal
          subject={selectedSubject}
          closeModal={closeModal}
        />
      )}
      {isInsertModalOpen && (
        <SubjectInsertModal
        setIsInsertModalOpen={setIsInsertModalOpen}/>
      )}
      </div>
    </motion.div>
  );
}

export default SubjectList;