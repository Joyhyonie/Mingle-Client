import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import { callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { callAttendanceSearchName, callLeaveDocSearchName, callMyLeaveDocSearchName } from '../../apis/AttendanceAPICalls';
import { useNavigate } from 'react-router-dom';
import { callCertiDocSearchName, callMyCertiDocSearchName } from '../../apis/CertiDocAPICalls';
import { callSubjectSearchName } from '../../apis/LectureAPICalls';

const AteendanceSearchBar = ({ options, type }) => { // options은 배열 형태로 검색 기준을 의미, type은 API 호출 시 구분하기 위한 String 

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
      navigate(`/attendance-employee?condtion=${selectedOption}&search=${inputValue}`);
    } else if (type == "subject") {
      navigate(`/subject?condtion=${selectedOption}&search=${inputValue}`);
    } else if (type == "certiDoc") {
      navigate(`/certi-doc-applied?condtion=${selectedOption}&search=${inputValue}`);
    } else if (type == "leaveDoc") {
      navigate(`/leave-doc-applied?condtion=${selectedOption}&search=${inputValue}`);
    } else if (type == "MyLeaveDoc") {
      navigate(`/Myleave?condtion=${selectedOption}&search=${inputValue}`);
    } else if (type == "myCertiDoc") {
      navigate(`/certi-doc-mine?condtion=${selectedOption}&search=${inputValue}`);
    }

  };
  const [readOnlyValue, setReadOnlyValue] = useState('읽기 전용 값');
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
        value={readOnlyValue} readOnly
      />
      <button className={SearchBarCss.searchBarBtn} onClick={handleSearch}>검색</button>
    </div>
  );
};

export default AteendanceSearchBar;