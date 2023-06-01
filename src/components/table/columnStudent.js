import React from "react";
import AllCheckedBoxColumn from "./AllCheckedBoxColumn";
import CheckBoxColumns from "./CheckBoxColumns";

export const columnStudent = () => [
  {
    // title: <AllCheckedBoxColumn />,
    dataIndex: "readAt",
    key: "readAt",
    width: 100,
    align: "center",
    ellipsis: true,
    render: (text, record) => <CheckBoxColumns />,
  },

  {
    title: "학번",
    dataIndex: "STD_CODE",
    key: "STD_CODE",
    align: "center",
    ellipsis: true,
    width: 440,
  },
  {
    title: "학년",
    dataIndex: "STD_LEVEL",
    key: "STD_LEVEL",
    align: "center",
    ellipsis: true,
    width: 440,
  },

  {
    title: "이름",
    dataIndex: "STD_NAME",
    key: "STD_NAME",
    align: "center",
    ellipsis: true,
    width: 120,
  },

  {
    title: "학과",
    dataIndex: "DEPT_CODE",
    key: "DEPT_CODE",
    align: "center",
    ellipsis: true,
    width: 100,
  },
  {
    title: "이메일",
    dataIndex: "STD_EMAIL",
    key: "STD_EMAIL",
    width: 100,
    align: "center",
    ellipsis: true,
  },
  {
    title: "휴대전화",
    dataIndex: "STD_PHONE",
    key: "STD_PHONE",
    width: 100,
    align: "center",
    ellipsis: true,
  },
  {
    title: "입학일",
    dataIndex: "STD_ENT_DATE",
    key: "STD_ENT_DATE",
    width: 100,
    align: "center",
    ellipsis: true,
  },
  {
    title: "상태",
    dataIndex: "STD_STATUS",
    key: "STD_STATUS",
    width: 100,
    align: "center",
    ellipsis: true,
  },
];
