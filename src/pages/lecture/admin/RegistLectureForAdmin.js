/* 행정직원의 '강의 개설' */
import { motion } from "framer-motion"
import CommonCSS from"../../../css/common/Common.module.css"
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
import SubjectInsertModal from "../../../components/modal/SubjectInsertModal";

function RegistLectureForAdmin () {

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
    toast.success("과목이 삭제 되었습니다.");
  }

  const onCLickInsert = () => {
    setIsInsertModalOpen(true);
  }



    //
    


    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
                    
        <div className={LectureRegist.registLectureDiv}>
            <p className={ CommonCSS.pageDirection }>강의 개설 </p>
            <button className={LectureRegist.registLecturebtn}>강의개설</button>
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
        <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
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

export default RegistLectureForAdmin;