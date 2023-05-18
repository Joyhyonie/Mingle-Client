import React, { useState, useMemo } from 'react';
import SearchBar from '../components/common/SearchBar';
import SelectBox from '../components/common/SelectBox';


function SearchAndListLayout({ listData, renderListItem, options, search, setSearch }) {

  const handleSearch = event => {
    setSearch(new URLSearchParams({ value: event.target.value }));
  };  

  const filteredList = listData ? listData.filter(item =>
    item.includes(search)
  ) : [];  

  return (
    <>
      <SelectBox options={options} defaultValue="deptCode"></SelectBox>
      <SearchBar onChange={handleSearch} value={search} setSearch={setSearch} />
      {filteredList.map(item => renderListItem(item))}
    </>
  );
}

export default SearchAndListLayout;
