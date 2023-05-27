import { deleteSubject, getSearch, getSubjects, postSubjects, putSubjects } from "../modules/SubjectModule";
import { getSubjectInfo, getLectureInfo, getAttendanceListInfo } from "../modules/LectureModule";
import { wait } from '@testing-library/user-event/dist/utils';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const SUBJECT_URL = `http://${SERVER_IP}:${SERVER_PORT}/subject`;
const LECTURE_URL = `http://${SERVER_IP}:${SERVER_PORT}/lecture`;
const ATTENDANCE_URL = `http://${SERVER_IP}:${SERVER_PORT}/stdattendance`;

export const callSubjectsAPI = ({ currentPage = 1 }) => {
    const requestURL = `${SUBJECT_URL}/list?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());
        console.log(result);
        if (result.status === 200) {
            dispatch(getSubjects(result));
        }
    };
}

export const callSubjectSearchName = ({ search, condition, currentPage = 1 }) => {
    const requestURL = `${SUBJECT_URL}/search?condition=${condition}&search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());

        if (result.status === 200) {
            console.log(result);
            dispatch(getSearch(result));
        }
    }
}


export const callSubjectUpdateAPI = (formData) => {

    const requestURL = `${SUBJECT_URL}/modify`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            body: formData
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(putSubjects(result));
        }
    }
}

export const callSubjectInsertAPI = (formData) => {

    const requestURL = `${SUBJECT_URL}/insert`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            body: formData
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(postSubjects(result));
        }
    }
}

export const callSubjectDelete = (checkedItems) => {

    const requestURL = `${SUBJECT_URL}/delete`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkedItems)
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(deleteSubject(result));
        }
    }
}

export const callSubjectListAPI = (deptCode) => {

    console.log("")

    const requestURL = `${LECTURE_URL}/professorsAndLectures/${deptCode}`
    /*필요한값 생각해보자  */

    //요청 url 이 안에서 비동기적으로 호출된다.. 
    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());
        console.log('[callsubjectList]:callSubjectListAPI result:', result);
        if (result.status === 200) {


            //api를 통해 데이터를 꺼내와서 store에 저장하자(내가 원하는값을 액션과 페이로드 )
            //store에 있는 값들을 다루는것은 action이라는 
            dispatch(getSubjectInfo(result));


        }
    }
}

export const callLectureInsertAPI = (form) => {

    const requestURL = `${LECTURE_URL}/officerregistration`;

    form = {
        ...form,
        employee: { empCode: form.empCode },
        subject: { sbjCode: form.sbjCode }

    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(postSubjects(result));
        }
    }
}

export const callLectureListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${LECTURE_URL}/adminLectureList?page=${currentPage}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET'
        }).then(response => response.json());

        /*dispatch의 매개변수로 action 객체를 전달하여 store에 state를 저장하게 한다. */
        if (result.status === 200) {
            dispatch(getLectureInfo(result));
            console.log(result);
        }
    }
}


/*출석 정보 불러오는 API */

export const callCourceStdListAPI = ({ lecCode }) => {

    console.log(lecCode)

    const requestURL = `${ATTENDANCE_URL}/stdlist/${lecCode}`;
    /*필요한값 생각해보자  */

    //요청 url 이 안에서 비동기적으로 호출된다.. 
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET'
        }).then(response => response.json());
        console.log('[callsubjectList]:callSubjectListAPI result:', result);
        if (result.status === 200) {


            //api를 통해 데이터를 꺼내와서 store에 저장하자(내가 원하는값을 액션과 페이로드 )
            //store에 있는 값들을 다루는것은 action이라는 
            dispatch(getAttendanceListInfo(result));
            console.log(result);


        }
    }
}


