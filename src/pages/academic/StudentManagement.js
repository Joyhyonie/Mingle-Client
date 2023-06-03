/* 행정직원의 '교직원 관리' */
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { callStudentsAPI, callStudentsDeleteAPI, callStudentSearchListAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import SearchBar from '../../components/common/SearchBar';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import StudentListCSS from '../../css/StudentList.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';

const options = [
  { value: 'stdName', label: '학생명' },
  { value: 'deptName', label: '소속명' },
];

function StudentManagement() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, search } = useSelector((state) => state.StudentReducer);
  const [currentPage, setCurrentPage] = useState(1);

  // checkbox
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  // search
  const [params] = useSearchParams();
  const condition = params.get('condition');
  const name = params.get('search');
  const type = "student";
  

  useEffect(
    () => {
      if (name) {
        dispatch(callStudentSearchListAPI({ search: name, condition: condition, currentPage: currentPage }))
        return;
      }
      dispatch(callStudentsAPI({ currentPage }))
    },
    [currentPage, condition, name]
  );

  /* 학생 테이블 항목 클릭 이벤트 */
  const onStudentItemClickHandler = async (stdCode) => {
    navigate(`/modify-student/${stdCode}`);
  }

  /* 학생 체크박스 클릭과 테이블 항목 클릭 이벤트 버블링 중지 이벤트 */
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };


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
    students.data.forEach((student) => {
      newCheckboxes[student.stdCode] = e.target.checked;
    });
    setCheckboxes(newCheckboxes);
  };

  // 등록버튼을 눌렀을 때 등록 페이지로 이동!
  const onClickStudentInsert = () => {
    navigate("/regist-student");
  }

  // onClickStudentDelete
  const onClickStudentDelete =
    async () => {
      const selectedStdCodes =
        Object.keys(checkboxes).filter((stdCode) => checkboxes[stdCode]);
      if (selectedStdCodes.length > 0) {
        await dispatch(callStudentsDeleteAPI(selectedStdCodes));
        // 선택한 체크박스 초기화
        setCheckboxes({});
        // 교직원 목록 갱신
        dispatch(callStudentsAPI({ currentPage }));
        toast.success("교직원 정보가 성공적으로 삭제 되었습니다.");
      } else {
        toast.error("지우고자 하는 교직원 정보를 선택해 주세요!");
      }
    };



  return (
    <motion.div
      className={StudentListCSS.StudentList}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={StudentListCSS.StudentRegistButton}
        onClick={onClickStudentInsert}
      >
        등록
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={StudentListCSS.StudentDeleteButton}
        onClick={onClickStudentDelete}
      >
        삭제
      </motion.button>

      <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원</p>


      <div className={SearchBarCss.basic}>
        <SearchBar options={options} type={type} />
      </div>
      <table className={StudentListCSS.studentTable}>
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
          <tr className={StudentListCSS.studentTr}>
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
            <th>입사일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {(search && search.data) ? (
            search.data.map((student) => (
              <tr
                key={student.stdCode}
                onClick={() => onStudentItemClickHandler(student.stdCode)}
              >
                <td>
                  <input
                    type="checkbox"
                    value={student.stdCode}
                    checked={checkboxes[student.stdCode] || false}
                    onChange={(e) => handleCheckboxChange(e, student.stdCode)}
                    onClick={handleCheckboxClick}
                  />
                </td>
                <td>{student.stdCode}</td>
                <td>{student.stdName}</td>
                <td>{student.department.deptName}</td>
                <td>{student.stdEmail}</td>
                <td>{student.stdPhone}</td>
                <td>{new Date(student.stdEntDate).toISOString().split('T')[0]}</td>
                <td>{student.stdStatus}</td>
              </tr>
            ))
          )
            :
            (students && students.data) &&
            students.data.map((student) => (
                <tr
                  key={student.stdCode}
                  onClick={() => onStudentItemClickHandler(student.stdCode)}
                >
                  <td>
                    <input
                      type="checkbox"
                      value={student.stdCode}
                      checked={checkboxes[student.stdCode] || false}
                      onChange={(e) => handleCheckboxChange(e, student.stdCode)}
                      onClick={handleCheckboxClick}
                    />
                  </td>
                  <td>{student.stdCode}</td>
                  <td>{student.stdName}</td>
                  <td>{student.department.deptName}</td>
                  <td>{student.stdEmail}</td>
                  <td>{student.stdPhone}</td>
                  <td>{new Date(student.stdEntDate).toISOString().split('T')[0]}</td>
                  <td>{student.stdStatus}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <div>
        {(search && search.pageInfo) ? (<PagingBar pageInfo={search.pageInfo} setCurrentPage={setCurrentPage} />)
          : (students && students.pageInfo) ? (<PagingBar pageInfo={students.pageInfo} setCurrentPage={setCurrentPage} />)
            : null}
      </div>

    </motion.div>
  );
};

export default StudentManagement;