import { useState } from 'react';
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
    <input className={SearchBarCss.searchBar}
      type="text"
      placeholder="검색어를 입력해 주세요 :)"
      value={searchTerm}
      onChange={handleChange}
    />
    <button className={SearchBarCss.searchBarBtn}>검색</button>
    </>
  );
}

export default SearchBar;