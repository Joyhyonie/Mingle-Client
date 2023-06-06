import React, { useState } from 'react';
import LectureSelectBox from '../components/common/LectureSelectBox';


function LectureRegistSearchbar({ listData, renderListItem }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = listData ? listData.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const options1 = [
    { value: "", name: "학년도" },
  ];
  
  const options2 = [
    { value: "", name: "학기" },
    { value: "", name: "1" },
    { value: "", name: "2" },
  
  ];

  
  const options3 = [
    { value: "", name: "비고" },

  ];



  return (
    <>  
      <LectureSelectBox options={options1} defaultValue="deptCode"></LectureSelectBox>
      <LectureSelectBox options={options2} defaultValue="deptCode"></LectureSelectBox>
      <LectureSelectBox options={options3} defaultValue="deptCode"></LectureSelectBox>



      {filteredList.map(item => renderListItem(item))}


    </>
  );
}

export default LectureRegistSearchbar;
