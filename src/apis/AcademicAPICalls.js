import { getEmployees, getEmployee, postEmployee, putEmployee } from '../modules/EmployeeModule';
import { getStudents } from '../modules/StudentModule';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const EMPLOYEE_URL = `http://${SERVER_IP}:${SERVER_PORT}/employee`;
const STUDENT_URL = `http://${SERVER_IP}:${SERVER_PORT}/student`;

// 교직원 전체 조회
export const callEmployeesAPI = ({ currentPage = 1 }) => {

  const requestURL = `${EMPLOYEE_URL}/employees?page=${currentPage}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL).then(response => response.json());
    console.log(result);

    if (result.status === 200) {
      dispatch(getEmployees(result));
      console.log(result);
    }
  }
}

// 교직원 상세 조회
export const callEmployeeDetailAPI = ({ empCode }) => {

  const requestURL = `${EMPLOYEE_URL}/employees/{empCode}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL).then(response => response.json());

    if (result.status === 200) {
      console.log("[AcademicAPICalls] callEmployeeDetailAPI result : ", result);
      dispatch(getEmployee(result));


    }
  }

}

// 교직원 신규 등록
export const callEmployeeInsertAPI = (formData) => {

  const requestURL = `${EMPLOYEE_URL}/insert`;

  return async (dispatch, getState) => {

    console.log(formData);
    const result = await fetch(requestURL, {
      method: "POST",
      body: formData
    }).then(response => response.json());

    if (result.status === 200) {
      console.log('[AcademicAPICalls] : callEmployeeInsertAPI result : ', result);
      dispatch(postEmployee(result));
    }
  }
}

// 교직원 정보 수정
export const callEmployeeUpdateAPI = (formData) => {

  const requestURL = `${EMPLOYEE_URL}/modify`;

  return async (dispatch, getState) => {

    console.log(formData);
    const result = await fetch(requestURL, {
      method: "PUT",
      body: formData
    }).then(response => response.json());

    if (result.status === 200) {
      console.log('[AcademicAPICalls] : callEmployeeUpdateAPI result : ', result);
      dispatch(putEmployee(result));
    }
  }
}


// 학생 전체 조회
export const callStudentsAPI = ({ currentPage = 1 }) => {

  const requestURL = `${STUDENT_URL}/students?page=${currentPage}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL).then(response => response.json());
    console.log(result);

    if (result.status === 200) {
      dispatch(getStudents(result));
      console.log(result);
    }
  }
}