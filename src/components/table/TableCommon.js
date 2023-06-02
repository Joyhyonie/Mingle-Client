import React from "react";
import styled from "styled-components";
import Table from "rc-table";

const TableCommon = ({
  columns = [],
  data = [],
  id = "table-common-content",
  ...props
}) => {
  return (
    <StyledTableWrapper>
      <Table
        id={id}
        data={data}
        columns={columns}
        rowKey={(r, idx) => r.id + idx}
        rowClassName={(r) => {
          let className = "";
          if (r.isNotice) className += "rc-notice ";
          if (r.id === props.activeId) className += "rc-active";
          return className;
        }}
        {...props}
      />
    </StyledTableWrapper>
  );
};

export default TableCommon;

export const StyledTableWrapper = styled.div`
  margin-top: 15px;

  .rc-table-content {
    display: flex;
  }

  .table-title {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 24px;
  }

  .rc-table-thead {
    .rc-table-cell {
      font-weight: bold;
      text-align: center;
      font-size: 20px;
    }
  }

  .rc-active {
    background: var(--color-table-active);
  }

  table {
    border-spacing: 0;
    background: var(--color-background);
    width: 100%;
    flex: auto;
    table-layout: inherit !important;

    tr {
      text-align: center;
      position: relative;
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);

      :last-child {
        td {
          border-bottom: 0;
        }
      }

      @media (hover: hover) {
        &:hover {
          background: var(--color-light-hover);
        }
      }
    }
    th,
    td {
      margin: 0;
      height: 40px;
      border-bottom: 1px solid var(--color-border);
      border-right: none;
      color: var(--color-primary-text);
      font-size: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      a {
        font-size: 13px;
      }
    }

    .rc-notice {
      font-weight: 500;
      background: var(--color-primary-bg);
    }
  }

  @media screen and (max-width: 960px) {
    margin-top: 0px;
    margin-bottom: 10px;

    thead {
      display: none;
    }

    table {
      flex: auto;

      tr {
        border-top: none !important;
        border-bottom: none !important;
      }

      th,
      td {
        width: 100%;
        padding: 0px !important;
        border-bottom: 1px solid transparent !important;

        &:not(:first-child) {
          display: none;
        }
      }
    }
  }
`;
