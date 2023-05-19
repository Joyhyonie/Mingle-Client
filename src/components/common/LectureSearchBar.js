import React, { useState } from 'react';
import Header from './Header';
import NavbarForAdmin from './NavbarForAdmin';
import NavbarForAdminItem from './NavbarForAdminItem';
import SearchBarCss from '../../css/common/SearchBar.module.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
     <input className={SearchBarCss.searchBarAttLec}
      type="text"
      placeholder="강의명을 입력해 주세요 :)"
      value={searchTerm}
      onChange={handleChange}
    />
    <input className={SearchBarCss.searchBarAttDate}
      type="text"
      placeholder="수업 날짜를 입력해주세요 :)"
      value={searchTerm}
      onChange={handleChange}
    />
  
    
    
    </>
  );
}

export default SearchBar;
