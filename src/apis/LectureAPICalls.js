import { deleteSubject, getSubjects, postSubjects, putSubjects } from "../modules/SubjectModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const SUBJECT_URL = `http://${SERVER_IP}:${SERVER_PORT}/subject`;

export const callSubjectsAPI = ({currentPage=1}) => {
    const requestURL = `${SUBJECT_URL}/list?page=${currentPage}`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL).then(response => response.json());
        console.log(result);
        if(result.status === 200){
            dispatch(getSubjects(result));
            console.log('123' , result);
            console.log(result);
        }
    };
}

export const callSubjectUpdateAPI = (formData) => {

    const requestURL = `${SUBJECT_URL}/modify`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : 'PUT',
            body : formData
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(putSubjects(result));
        }
    }
}

export const callSubjectInsertAPI = (formData) => {

    const requestURL = `${SUBJECT_URL}/insert`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method : 'POST',
            body : formData
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(postSubjects(result));
        }
    }
}

export const callSubjectDelete = (checkedItems) => {

    const requestURL = `${SUBJECT_URL}/delete`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method : 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(checkedItems)
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(deleteSubject(result));
        }
    }
}