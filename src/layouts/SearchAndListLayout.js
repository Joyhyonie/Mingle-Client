/* 검색 헤더를 위에 fix하고 아래에는 List를 두는 페이지를 위한 Layout */
import React, { Children, useState } from 'react';
import SearchBar from '../components/common/SearchBar';

function SearchAndListLayout({ listData, renderListItem }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredList = listData.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <SearchBar onChange={handleSearch} value={searchTerm} />

      {filteredList.map(item => renderListItem(item))}

    </>
  );
}

export default SearchAndListLayout;
