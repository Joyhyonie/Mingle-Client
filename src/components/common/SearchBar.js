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
    if(type == "employee") {
      dispatch(callEmployeeSearchListAPI({ search: inputValue, selectedOption }));
    } else if(type == "board") {
      navigate(`/board/main?condition=${selectedOption}&word=${inputValue}`)
    } else if(type == "attendance") {
        dispatch(callAttendanceSearchName({search: inputValue , condition : selectedOption, currentPage : currentPage}));
    } else if(type == "subject"){
        dispatch(callSubjectSearchName({search: inputValue , condition : selectedOption, currentPage : currentPage}));
    } else if(type == "certiDoc"){
      dispatch(callCertiDocSearchName({search: inputValue , condition : selectedOption, currentPage : currentPage}));
    } else if(type == "leaveDoc"){
      dispatch(callLeaveDocSearchName({search: inputValue , condition : selectedOption, currentPage : currentPage}));
    } else if(type == "MyLeaveDoc"){
      dispatch(callMyLeaveDocSearchName({search: inputValue , condition : selectedOption, currentPage : currentPage}));
    } else if(type == "myCertiDoc"){
      dispatch(callMyCertiDocSearchName({search: inputValue , condition : selectedOption, currentPage : currentPage}));
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