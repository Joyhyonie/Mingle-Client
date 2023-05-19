import React, { useState, useMemo } from 'react';
import LectureSearchBar from '../components/common/LectureSearchBar';
import LectureAttendanceSelectBox from '../components/common/LectureAttendanceSelectBox';


function SearchAndListLayoutAtt({ listData, renderListItem, options }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredList = listData ? listData.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];



  return (
    <>
      <LectureSearchBar onChange={handleSearch} value={searchTerm} />
      <LectureAttendanceSelectBox options={options} defaultValue="deptCode"></LectureAttendanceSelectBox>


      {filteredList.map(item => renderListItem(item))}


    </>
  );
}

export default SearchAndListLayoutAtt;
