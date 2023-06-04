import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StdAttendanceSearchBar from '../../css/common/StdAttendanceSearchBar.module.css';
import { callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { callAttendanceSearchName, callLeaveDocSearchName, callMyLeaveDocSearchName } from '../../apis/AttendanceAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { callCertiDocSearchName, callMyCertiDocSearchName } from '../../apis/CertiDocAPICalls';
import { callSubjectSearchName, callNewAttendanceListAPI } from '../../apis/LectureAPICalls';
import { useEffect } from 'react';

const AteendanceSearchBar = ({ options, type }) => { // options은 배열 형태로 검색 기준을 의미, type은 API 호출 시 구분하기 위한 String 
  const { lecCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { newAttendance, modify } = useSelector(state => state.SubjectInfoReducer);
  const [readOnlyValue, setReadOnlyValue] = useState('읽기 전용 값');
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  console.log("제발나와라", options && options.lecCount);



  const handleSearch = (e) => {


    const stdAtdDate = selectedOption
    dispatch(callNewAttendanceListAPI({ lecCode, stdAtdDate }))


  };

  useEffect(
    () => {
      // if (selectedOption) {
      //   console.log("모디파1", modify);
      //   console.log("selectedOption1", selectedOption)

      const stdAtdDate = selectedOption
      dispatch(callNewAttendanceListAPI({ lecCode, stdAtdDate }))


      // }
      // console.log("모디파2", modify);
      // console.log("selectedOption2 ", selectedOption)

    }

    , [modify]
  );


  const onChangeHandler = (e) => {

    setSelectedOption(e.target.value);



    console.log("제발나와라3", e.target.value);
  }





  console.log("option강의명", options);
  return (
    <div className={StdAttendanceSearchBar.searchBarWhole}>

      <select style={{ textAlignLast: 'center' }}
        value={selectedOption}
        onChange={onChangeHandler}
        className={StdAttendanceSearchBar.searchBarSelect}>
        <option value="">주차를 선택해 주세요.</option> default option
        {[...Array(options && options.lecCount)].map((_, index) => (
          <option value={index + 1}>{index + 1}주차</option>
        ))}

      </select>



      <button className={StdAttendanceSearchBar.searchBarBtn} onClick={handleSearch}>조회</button>
    </div>
  );
};

export default AteendanceSearchBar;