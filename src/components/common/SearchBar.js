import { useState } from 'react';
import Header from './Header';
import NavbarForAdmin from './NavbarForAdmin';
import NavbarForAdminItem from './NavbarForAdminItem';
import SearchBarCss from '../../css/common/SearchBar.module.css'

function SearchBar({ search, setSearch }) {

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    setSearch(search);
  };

  return (
    <>
    <input className={SearchBarCss.searchBar}
      type="text"
      placeholder="검색어를 입력해 주세요 :)"
      value={search}
      onChange={handleChange}
    />
    <button className={SearchBarCss.searchBarBtn} onClick={handleSearch}>검색</button>
    </>
  );
}

export default SearchBar;