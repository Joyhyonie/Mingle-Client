import { getEmployees, getEmployee, postEmployee, putEmployee, deleteEmployee } from '../modules/EmployeeModule';
import { getStudents, getStudent, postStudent, putStudent, deleteStudent } from '../modules/StudentModule';

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

// 교직원(조직도) 서치
export const callEmployeeSearchListAPI = ({ search, currentPage = 1 }) => {
  const encodedSearch = encodeURIComponent(search);  // URL에 안전하게 포함될 수 있도록 검색어를 인코딩합니다.
  const requestURL = `${EMPLOYEE_URL}/employees/search?search=${search}&page=${currentPage}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL).then(response => response.json());

    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callEmployeeSearchListAPI result : ", result);
      dispatch(getEmployees(result));
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

// 교직원 정보 삭제
export const callEmployeesDeleteAPI = (empCodes) => {

  const requestURL = `${EMPLOYEE_URL}/delete`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empCodes),
    }).then(response => response.json());

    if (result.status === 200) {
      console.log('[AcademicAPICalls] : callEmployeesDeleteAPI result : ', result);
      dispatch(deleteEmployee(result));
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
      console.log("[AcademicAPICalls] callStudentsAPI result : ", result);
    }
  }
}

// 학생 상세 조회
export const callStudentDetailAPI = ({ stdCode }) => {

  const requestURL = `${STUDENT_URL}/students/${stdCode}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
        method : 'GET',
        headers : {
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(response => response.json());

    if (result.status === 200) {
      console.log("[AcademicAPICalls] callStudentDetailAPI result : ", result);
      dispatch(getStudent(result));


    }
  }

}

// 학생 신규 등록
export const callStudentInsertAPI = (formData) => {

  const requestURL = `${STUDENT_URL}/insert`;

  return async (dispatch, getState) => {

    console.log(formData);
    const result = await fetch(requestURL, {
      method: "POST",
      body: formData
    }).then(response => response.json());

    if (result.status === 200) {
      console.log('[AcademicAPICalls] : callStudentInsertAPI result : ', result);
      dispatch(postStudent(result));
    }

    console.log(result.data);
  }
}

// 학생 정보 수정
export const callStudentUpdateAPI = (formData) => {

  const requestURL = `${STUDENT_URL}/modify`;

  return async (dispatch, getState) => {

    console.log(formData);
    const result = await fetch(requestURL, {
      method: "PUT",
      body: formData
    }).then(response => response.json());

    if (result.status === 200) {
      console.log('[AcademicAPICalls] : callStudentUpdateAPI result : ', result);
      dispatch(putStudent(result));
    }
  }
}

// 학생 정보 삭제
export const callStudentsDeleteAPI = (stdCodes) => {

  const requestURL = `${STUDENT_URL}/delete`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stdCodes),
    }).then(response => response.json());

    if (result.status === 200) {
      console.log('[AcademicAPICalls] : callStudentsDeleteAPI result : ', result);
      dispatch(deleteStudent(result));
    }
  }
}

