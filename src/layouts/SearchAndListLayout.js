import React, { useState, useMemo } from 'react';
import SearchBar from '../components/common/SearchBar';
import SelectBox from '../components/common/SelectBox';


function SearchAndListLayout({ listData, renderListItem, options }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredList = listData ? listData.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];



  return (
    <>
      <SelectBox options={options} defaultValue="deptCode"></SelectBox>
      <SearchBar onChange={handleSearch} value={searchTerm} />

      {filteredList.map(item => renderListItem(item))}


    </>
  );
}

export default SearchAndListLayout;
