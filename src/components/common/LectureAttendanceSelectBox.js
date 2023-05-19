import SearchBarCss from '../../css/LectureSearchBar.module.css';
import SearchBarCss2 from '../../css/common/SearchBar.module.css';

import styled from "styled-components";

const SelectBoxWrapper = styled.div`
  display: flex;
  flex-grow:1;
  `;

const IconSVG = styled.svg`
    margin-left: -22px;
    align-self: center;
    width: 12px;
    height: 12px;
  `;

const LectureAttendanceSelectBox = (props) => {
  const handleChange = (e) => {
    // event handler
    console.log(e.target.value);
  };

  return (
    <>
      <SelectBoxWrapper>
        <select className={SearchBarCss.selectBox} onChange={handleChange}>
          {props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              defaultValue={props.defaultValue === option.value}
            >
              {option.name}
            </option>
          ))}
        </select>
        <IconSVG
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 14L16 6H4L10 14Z"
            fill="#1A1A1A"
          />
        </IconSVG>
      </SelectBoxWrapper>
      <button className={SearchBarCss2.searchBarBtnAtt}>조회</button>
      <button className={SearchBarCss2.searchBarBtnAtt}>저장</button>
    </>
  );
};


export default LectureAttendanceSelectBox;