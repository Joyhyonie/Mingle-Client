import { deleteSubject, getSearch, getSubjects, postSubjects, putSubjects } from "../modules/SubjectModule";



import { getSubjectInfo, getLectureInfo, getOpenLectureInfo, getLectureSearch, getOpenLectureSearch, patchStdattendanceModify, getAttendanceListInfo, getMylecture, getNewAttendancelistInfo, getLecnameMylecture, getMylectureCerti, getSearchName, patchLecPlan, getStudentAttendance } from "../modules/LectureModule";
import { request } from "./Api";



const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const SUBJECT_URL = `http://${SERVER_IP}:${SERVER_PORT}/subject`;
const LECTURE_URL = `http://${SERVER_IP}:${SERVER_PORT}/lecture`;
const ATTENDANCE_URL = `http://${SERVER_IP}:${SERVER_PORT}/stdattendance`;
const NEWATTENDANCE_URL = `http://${SERVER_IP}:${SERVER_PORT}/attendance`;

export const callSubjectsAPI = ({ currentPage = 1 }) => {
    const requestURL = `${SUBJECT_URL}/list?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());
        console.log(result);
        if (result.status === 200) {
            dispatch(getSubjects(result));
        }
    };
}

export const callSubjectSearchName = ({ search, condition, currentPage = 1 }) => {
    const requestURL = `${SUBJECT_URL}/search?condition=${condition}&search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {        
        const result = await fetch(requestURL,{
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {

            dispatch(getSearch(result));
        }
    }
}




export const callSubjectInsertAPI = (formData) => {

    const requestURL = `${SUBJECT_URL}/insert`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers : {
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            },
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
                'Content-Type': 'application/json',
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
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


            dispatch(getSubjectInfo(result));

        }
    }
}

export const callMyLectureCertiCallAPI = () => {
    const requestURL = `${LECTURE_URL}/myLectureCerti`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(getMylectureCerti(result));
        }
    }
}

export const callMyLectureCallAPI = ({ currentPage = 1 }) => {
    const requestURL = `${LECTURE_URL}/myLecture?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(getMylecture(result));
        }
    }
}



export const callLecNameMyLecture = ({ currentPage = 1 }) => {
    const requestURL = `${LECTURE_URL}/lecNameMyLecture?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(getLecnameMylecture(result));
        }
    }
}

export const callSearchName = ({ search, condition, currentPage = 1 }) => {
    const requestURL = `${LECTURE_URL}/search?condition=${condition}&search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(getSearchName(result));
            console.log(result);
        }
    }
}

/*행정직원의 강의 등록 페이지 */
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
/*행정직원의 출결 및 성적관리의 강의리스트 */
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

/*강의 개설에 대한 강의리스트 */
export const callOpenLectureListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${LECTURE_URL}/adminOpenLectureList?page=${currentPage}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET'
        }).then(response => response.json());


        if (result.status === 200) {
            dispatch(getOpenLectureInfo(result));
            console.log(result);
        }
    }
}


/*출석 정보 불러오는 API lecCount 포함 */

export const callCourceStdListAPI = ({ lecCode }) => {

    console.log(lecCode)

    const requestURL = `${ATTENDANCE_URL}/stdlist/${lecCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET'
        }).then(response => response.json());
        console.log('출석 정보 불러오기 API lecCount 포함', result);
        if (result.status === 200) {



            dispatch(getAttendanceListInfo(result));
            console.log(result);


        }
    }
}

/*해당 주차에 해당 강의에 대한 출석 정보 조회  */
export const callNewAttendanceListAPI = ({ lecCode, stdAtdDate }) => {

    console.log(lecCode)
    const requestURL = `${NEWATTENDANCE_URL}/list/${lecCode}?stdAtdDate=${stdAtdDate}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET'
        }).then(response => response.json());
        console.log('[callNewAttendanceList]:callNewAttendanceListAPI result:', result);
        if (result.status === 200) {



            dispatch(getNewAttendancelistInfo(result));
            console.log(result);


        }
    }
}

/*학생 출석정보 수정  */
export const callAttendanceModifyAPI = (formData, { stdAtdCode }) => {
    console.log("출석코드", stdAtdCode)
    console.log("출석변경상태", formData)

    const requestURL = `${NEWATTENDANCE_URL}/modify/${stdAtdCode}`;


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {

            method: 'PATCH',
            body: formData
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(patchStdattendanceModify(result));

        }

    }
}


export const callSubjectUpdateAPI = (formData) => {

    const requestURL = `${SUBJECT_URL}/modify`;


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers : {
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: formData
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(putSubjects(result));
        }
    }
}



export const callLecPlanInsertAPI = (formData, lecCode) => {

    const requestURL = `${LECTURE_URL}/lecturePlan/${lecCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: 'PATCH',
            headers : {
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: formData
        }).then(response => response.json());

        if (result.status === 200) {
            console.log(result);
            dispatch(patchLecPlan(result));
        }
    }
}



export const callLectureSearchNameAPI = ({ search, condition, currentPage = 1 }) => {


    const requestURL = `${LECTURE_URL}/listSearch?condition=${condition}&search=${search}&page=${currentPage}`;
    console.log("requestURL", requestURL);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());
        console.log("callLectureSearchNameAPIresult1", result);
        if (result.status === 200) {

            dispatch(getLectureSearch(result));

        }
    }
}

export const callOpenLectureSearchNameAPI = ({ search, condition, currentPage = 1 }) => {


    const requestURL = `${LECTURE_URL}/OpenListSearch?condition=${condition}&search=${search}&page=${currentPage}`;
    console.log("requestURL", requestURL);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());
        console.log("callLectureSearchNameAPIresult1", result);
        if (result.status === 200) {

            dispatch(getOpenLectureSearch(result));

        }
    }
}

/* 수강코드로 해당 강의를 수강하는 학생들의 출결 조회 (성적표 조회를 위함) */
export function callStudentAttendanceGetAPI(courseCode) {

    return async (dispatch, getState) => {

        const result = await request('GET', `/attendance/std-attendance/${courseCode}`);

        if (result.status == 200) {
            dispatch(getStudentAttendance(result));
        }

    }

}