/* 행정직원의 '교직원 관리' */
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { callStudentsAPI, callStudentsDeleteAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import EmployeeInsertModal from "../../components/modal/EmployeeInsertModal";
import SearchBarCss from '../../css/common/SearchBar.module.css';
import StudentListCss from '../../css/StudentList.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import SearchBar from "../../components/common/SearchBar";


const studentOptions = [
  { value: "stdCode", label: "학번" },
  { value: "stdName", label: "학생명" },
  { value: "deptCode", label: "학과명" },
];

const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }

function StudentManagement() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, pageInfo } = useSelector((state) => state.StudentReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(
    () => {
      dispatch(callStudentsAPI({ currentPage }))
    },
    [currentPage]
  );

  // 테이블 행을 클릭하면 학생 상세 및 수정 페이지로 라우팅
  const onClickTableTr = (stdCode) => {
    console.log("학생 정보 : " + stdCode)
    navigate(`/${stdCode}/modify`);
  }

  // 각 학생의 체크박스
  const handleCheckboxChange = (e, stdCode) => {
    const newCheckboxes = {
      ...checkboxes,
      [stdCode]: e.target.checked
    };
    setCheckboxes(newCheckboxes);

    const allSelected = Object.values(newCheckboxes).every(val => val === true);
    setSelectAll(allSelected);
  };


  // 모두 선택
  const handleSelectAll = (e) => {
    // 체크 해제
    setSelectAll(e.target.checked);

    // 체크박스 상태 통일(전체)
    let newCheckboxes = {};
    data.forEach((student) => {
      newCheckboxes[student.stdCode] = e.target.checked;
    });
    setCheckboxes(newCheckboxes);
  };

  // onClickStudentInsert
  const onClickStudentInsert = () => {
    navigate("/regist-student");
  }

  // onClickStudentDelete => 학생 정보 삭제 !
  const onClickStudentDelete =
    async () => {
      const selectedStdCodes =
        Object.keys(checkboxes).filter((stdCode) => checkboxes[stdCode]);
      if (selectedStdCodes.length > 0) {
        await dispatch(callStudentsDeleteAPI(selectedStdCodes));
        // 선택한 체크박스 초기화
        setCheckboxes({});
        // 학생 목록 갱신
        dispatch(callStudentsAPI({ currentPage }));
        toast.success("학생 정보가 성공적으로 삭제 되었습니다.");
      } else {
        toast.error("지우고자 하는 학생 정보를 선택해 주세요!");
      }
    };


  // // onClickTableTr => 테이블 행 클릭시 교직원 상세 조회 및 수정 페이지로 라우팅
  // const onClickTableTr = (student) => {
  //   setIsEmployeeUpdateModalOpen(true);
  // }


  return (
    <motion.div
      className={StudentListCss.studentList}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >

      <motion.button
        whileHover={{ scale: 1.05 }}
        className={StudentListCss.studentRegistButton}
        onClick={onClickStudentInsert}
      >
        등록
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className={StudentListCss.studentDeleteButton}
        onClick={onClickStudentDelete}
      >
        삭제
      </motion.button>

      <p className={CommonCSS.pageDirection}>학사관리 ▸ 학생</p>


      <div className={SearchBarCss.basic}>
        {<SearchBar
          options={studentOptions}>
        </SearchBar>}
      </div>
      <table className={StudentListCss.studentTable}>
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="20%" />
          <col width="15%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr className={StudentListCss.studentTr}>
            <th>
              <input type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              ></input>
            </th>
            <th>학번</th>
            <th>이름</th>
            <th>학과</th>
            <th>이메일</th>
            <th>휴대전화</th>
            <th>입학일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((student) => (
              <tr
                key={student.stdCode}
                onClick={() => onClickTableTr(student.stdCode)}
              >
                <td><input
                  type="checkbox"
                  value={student.stdCode}
                  checked={checkboxes[student.stdCode] || false}
                  onChange={(e) => handleCheckboxChange(e, student.stdCode)}
                /></td>
                <td>{student.stdCode}</td>
                <td>{student.stdName}</td>
                <td>{student.department.deptName}</td>
                <td>{student.stdEmail}</td>
                <td>{student.stdPhone}</td>
                <td>{new Date(student.stdEntDate).toISOString().split('T')[0]}</td>
                <td>{student.stdStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
      </div>

    </motion.div>
  );
};

export default StudentManagement;