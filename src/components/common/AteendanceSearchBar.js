import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import { callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { callAttendanceSearchName, callLeaveDocSearchName, callMyLeaveDocSearchName } from '../../apis/AttendanceAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { callCertiDocSearchName, callMyCertiDocSearchName } from '../../apis/CertiDocAPICalls';
import { callSubjectSearchName, callNewAttendanceListAPI } from '../../apis/LectureAPICalls';

const AteendanceSearchBar = ({ options, type }) => { // options은 배열 형태로 검색 기준을 의미, type은 API 호출 시 구분하기 위한 String 
  const { lecCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const handleSearch = () => {

    // 구분 해주세용 :)
    // if (type == "employee") {
    //   dispatch(callEmployeeSearchListAPI({ search: inputValue, selectedOption }));
    // } else if (type == "board") {
    //   navigate(`/board/main?condition=${selectedOption}&word=${inputValue}`)
    // } else if (type == "attendance") {
    //   navigate(`/attendance-employee?condtion=${selectedOption}&search=${inputValue}`);
    // } else if (type == "subject") {
    //   navigate(`/subject?condtion=${selectedOption}&search=${inputValue}`);
    // } else if (type == "certiDoc") {
    //   navigate(`/certi-doc-applied?condtion=${selectedOption}&search=${inputValue}`);
    // } else if (type == "leaveDoc") {
    //   navigate(`/leave-doc-applied?condtion=${selectedOption}&search=${inputValue}`);
    // } else if (type == "MyLeaveDoc") {
    //   navigate(`/Myleave?condtion=${selectedOption}&search=${inputValue}`);
    // } else if (type == "myCertiDoc") {
    //   navigate(`/certi-doc-mine?condtion=${selectedOption}&search=${inputValue}`);
    // }

  };
  const { newAttendance } = useSelector(state => state.SubjectInfoReducer);
  const [readOnlyValue, setReadOnlyValue] = useState('읽기 전용 값');
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  console.log("제발나와라", options && options.lecCount);
  const onChangeHandler = (e) => {

    setSelectedOption(e.target.value);
    const stdAtdDate = e.target.value
    dispatch(callNewAttendanceListAPI({ lecCode, stdAtdDate }))

    console.log("제발나와라3", e.target.value);
  }
  /*
  const numericValue = parseInt(selectedOption, 10);
  console.log("numericValue", numericValue);*/
  return (
    <div className={SearchBarCss.searchBarWhole}>

      <select
        value={selectedOption}
        onChange={onChangeHandler}
        className={SearchBarCss.searchBarSelect}>
        <option value="">주차를 선택해 주세요.</option> {/* default option */}
        {[...Array(options && options.lecCount)].map((_, index) => (
          <option value={index + 1}>{index + 1}주차</option>
        ))}

      </select>


      <input
        type="text"
        value={options} readOnly
      />
      <button className={SearchBarCss.searchBarBtn} onClick={handleSearch}>저장</button>
    </div>
  );
};

export default AteendanceSearchBar;