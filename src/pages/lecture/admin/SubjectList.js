/* 행정직원의 '과목 관리' */
import { motion } from "framer-motion"
import SubjectListCSS from '../../../css/SubjectList.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSubjectDelete, callSubjectUpdateAPI, callSubjectsAPI } from "../../../apis/LectureAPICalls";
import { useNavigate } from "react-router-dom";
import SubjectUpdateModal from "../../../components/modal/SubjectUpdateModal";
import SubjectInsertModal from "../../../components/modal/SubjectInsertModal";
import { toast } from "react-hot-toast";

function SubjectList() {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {data, pageInfo} = useSelector((state) => state.subjectReducer);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(
    ()=>{
      dispatch(callSubjectsAPI({currentPage}))
    },
    [currentPage,isModalOpen,isInsertModalOpen]
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
    dispatch(callSubjectDelete(checkedItems));
    toast("과목이 삭제 되었습니다.");
  }

  const onCLickInsert = () => {
    setIsInsertModalOpen(true);
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <div className={SubjectListCSS.container}>
        <button className={SubjectListCSS.deleteButton}
         onClick={onClickDelete}>선택 삭제</button>
        <button className={SubjectListCSS.insertButton}
         onClick={onCLickInsert}>과목 등록</button>
      </div>
      <div className={SubjectListCSS.SubjectList}>
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
              <th><input type="checkbox" /></th>
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
            {data && 
            data.map((subject) => (
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
            ))}    
          </tbody>
        </table>
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