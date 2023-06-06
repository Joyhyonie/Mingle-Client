import { useState } from 'react';
import { useDispatch } from 'react-redux';
import OpenLectureSearchBarCss from '../../css/common/OpenLectureSearchBar.module.css';
import { callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { callAttendanceSearchName, callLeaveDocSearchName, callMyLeaveDocSearchName } from '../../apis/AttendanceAPICalls';
import { useNavigate } from 'react-router-dom';
import { callCertiDocSearchName, callMyCertiDocSearchName } from '../../apis/CertiDocAPICalls';
import { callSubjectSearchName } from '../../apis/LectureAPICalls';

const OpenLectureSearchBar = ({ options, type }) => { // options은 배열 형태로 검색 기준을 의미, type은 API 호출 시 구분하기 위한 String 

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const handleSearch = () => {

    if (type == "registLectureForAdmin") {
      navigate(`/lecture-regist-admin?condition=${selectedOption}&search=${inputValue}`);
    }

  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={OpenLectureSearchBarCss.searchBarWhole2}>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className={OpenLectureSearchBarCss.searchBarSelect2}>
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
        className={OpenLectureSearchBarCss.searchBar2}
        onKeyUp={handleEnterKey}
      />
      <button className={OpenLectureSearchBarCss.searchBarBtn2} onClick={handleSearch}>검색</button>
    </div>
  );
};

export default OpenLectureSearchBar;