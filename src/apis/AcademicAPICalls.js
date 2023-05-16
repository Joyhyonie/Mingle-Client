import { getEmployee, getEmployees, postEmployee, putEmployee } from '../modules/EmployeeModule';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/employee`;

export const callEmployeeListAPI = ({ currentPage = 1 }) => {

  const requestURL = `${PRE_URL}/list?page=${currentPage}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL).then(response => response.json());
    console.log(result);

    if (result.status === 200) {
      dispatch(getEmployees(result));
      console.log(result);
    }
  }
}

export const callEmployeeDepartmentAPI = ({ deptCode, currentPage = 1 }) => {

  const requestURL = `${PRE_URL}/department/{deptCode}?page=${currentPage}`;

  return async (dispatch, getState) => {
    
    const result = await fetch(requestURL).then(response => response.json);

    if (result.status === 200) {
      dispatch(getEmployees(result));
    }
  }
}