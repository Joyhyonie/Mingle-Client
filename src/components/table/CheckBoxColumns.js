import React from "react";
import styled from "styled-components";

const CheckBoxColumns = (props) => {
  return (
    <StyledWrapper>
      <input {...props} />
      <label htmlFor={props.id} className="checkmark" />
    </StyledWrapper>
  );
};

export default CheckBoxColumns;

const StyledWrapper = styled.div`
  position: relative;
  top: 3px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkmark {
    position: relative;
    cursor: pointer;

    > span {
      font-size: 14px;
    }

    &:before {
      content: "";
      position: absolute;
      top: -2px;
      left: 0;
      width: 15px;
      height: 15px;
      background-color: #fff;
      border: 1px solid #c7c7c7;
      border-radius: 100px;
    }
  }

  input:checked ~ .checkmark {
    &:before {
      background: var(--color-primary);
      border: 1px solid var(--color-primary);
    }
  }

  input:checked ~ .checkmark:after {
    position: absolute;
    content: "";
    left: 6px;
    top: 1px;
    width: 4px;
    height: 7px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
