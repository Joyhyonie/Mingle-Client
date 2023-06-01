/* 행정직원의 '학생 정보 관리' */
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import {
  callStudentsAPI,
  callStudentsDeleteAPI,
} from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { columnStudent } from "../../components/table/columnStudent";
import TableCommon, { StyledTableWrapper } from '../../components/table/TableCommon';
import AllCheckedBoxColumn from '../../components/table/AllCheckedBoxColumn';
import CheckBoxColumns from '../../components/table/CheckBoxColumns';
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

  const columns = columnStudent();

  columns[0].title = () => <AllCheckedBoxColumn
    isChecked={selectAll}
    setIsChecked={setSelectAll}
    data={data}
  />;
  columns[0].render = (text, record) => <CheckBoxColumns
    id={record.STD_CODE}
    type="checkbox"
    checked={checkboxes[record.STD_CODE] || false}
    onChange={(e) => handleCheckboxChange(e, record.STD_CODE)}
  />;

  useEffect(() => {
    dispatch(callStudentsAPI({ currentPage }))
  }, [currentPage]);

  // 테이블 행을 클릭하면 학생 상세 및 수정 페이지로 라우팅
  const onClickTableTr = (stdCode) => {
    console.log("학생 정보 : " + stdCode)
    navigate(`/modify-student/${stdCode}`);
  }

  // onClickStudentInsert
  const onClickStudentInsert = () => {
    navigate("/regist-student");
  }

  // 각 학생의 체크박스
  const handleCheckboxChange = (e, stdCode) => {
    const newCheckboxes = {
      ...checkboxes,
      [stdCode]: e.target.checked
    };
    setCheckboxes(newCheckboxes);

    const allSelected = Object.values(newCheckboxes).every(
      val => val === true
    );
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

  // onClickStudentDelete => 학생 정보 삭제 !
  const onClickStudentDelete = async () => {
    const selectedStdCodes = Object.keys(checkboxes).filter(
      (stdCode) => checkboxes[stdCode]
    );
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



  return (
    <motion.div
      className={StudentListCss.studentList}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
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
        {<SearchBar options={studentOptions}></SearchBar>}
      </div>

      <StyledTableWrapper>
        <TableCommon
          columns={columns}
          data={data}
          rowClassName={(r) => {
            let className = "";
            if (r.isNotice) className += "rc-notice ";
          }}
        />
      </StyledTableWrapper>

      <div>
        {pageInfo && (
          <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
        )}
      </div>

    </motion.div>
  );
};

export default StudentManagement;