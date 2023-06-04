import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import { callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { callAttendanceSearchName, callLeaveDocSearchName, callMyLeaveDocSearchName } from '../../apis/AttendanceAPICalls';
import { useNavigate } from 'react-router-dom';
import { callCertiDocSearchName, callMyCertiDocSearchName } from '../../apis/CertiDocAPICalls';
import { callSubjectSearchName } from '../../apis/LectureAPICalls';

const SearchBar = ({ options, type }) => { // options은 배열 형태로 검색 기준을 의미, type은 API 호출 시 구분하기 위한 String 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const handleSearch = () => {

    // 구분 해주세용 :)
    if (type == "employee") {
      dispatch(callEmployeeSearchListAPI({ search: inputValue, selectedOption }));
    } else if (type == "board") {
      navigate(`/board/main?condition=${selectedOption}&word=${inputValue}`)
    } else if (type == "attendance") {
      navigate(`/attendance-employee?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "subject") {
      navigate(`/subject?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "certiDoc") {
      navigate(`/certi-doc-applied?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "leaveDoc") {
      navigate(`/leave-doc-applied?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "MyLeaveDoc") {
      navigate(`/Myleave?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "myCertiDoc") {
      navigate(`/certi-doc-mine?condtion=${selectedOption}&search=${inputValue}`);
    } else if (type == "organization") {
      navigate(`/organization?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "registLecture") {
      navigate(`/lecture-regist-prof?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "studentAttendance") {
      navigate(`/lecture-student-prof?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "lectureStudentAdmin") {
      navigate(`/lecture-student-admin?condition=${selectedOption}&search=${inputValue}`);
    } else if (type == "registLectureForAdmin") {
      navigate(`/lecture-regist-admin?condition=${selectedOption}&search=${inputValue}`);
    }

  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={SearchBarCss.searchBarWhole}>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className={SearchBarCss.searchBarSelect}>
        <option value="">화 이 팅 ୧( "̮ )୨✧</option> {/* default option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={SearchBarCss.searchBar}
        onKeyUp={handleEnterKey}
      />
      <button className={SearchBarCss.searchBarBtn} onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;