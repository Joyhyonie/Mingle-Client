import React from "react";
import styled from "styled-components";
import CheckBoxColumns from "./CheckBoxColumns";

const AllCheckedBoxColumn = ({ isChecked, setIsChecked, data }) => {
  const onCheckAllChange = (event) => {
    const list = event.target.checked ? data.map((item) => item.id) : [];
    setIsChecked({
      checkedList: list,
      isCheckedAll: event.target.checked,
    });
  };

  return (
    <StyledWrapper className="check-box-wrapper">
      <CheckBoxColumns
        id="check-all"
        type="checkbox"
        checked={isChecked.isCheckedAll}
        onChange={onCheckAllChange}
      />
    </StyledWrapper>
  );
};

export default AllCheckedBoxColumn;

const StyledWrapper = styled.div`
  position: relative;
`;
