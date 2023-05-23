import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_SUBJECTS = "subject/GET_SUBJECTS";
const GET_SUBJECT = "subject/GET_SUBJECT";
const PUT_SUBJECTS = "subject/PUT_SUBJECTS";
const POST_SUBJECTS = "subject/POST_SUBJECTS";
const DELETE_SUBJECT = 'subject/DELETE_SUBJECT';
const GET_SEARCH = "subject/GET_SEARCH";


export const {
    subject : { getSubjects, getSubject, putSubjects, postSubjects,deleteSubject, getSearch }
} = createActions({
    [GET_SUBJECTS] : (res) => res.data,
    [GET_SUBJECT] : (res) => res.data,
    [PUT_SUBJECTS] : (res) => res,
    [POST_SUBJECTS] : (res) => res,
    [DELETE_SUBJECT] : (res) => res,
    [GET_SEARCH] : res => res.data
});

const SubjectReducer = handleActions({
    [GET_SUBJECTS] : (state, {payload}) => payload,
    [GET_SUBJECT] : (state, {payload}) => ({subject:payload}),
    [PUT_SUBJECTS] : (state ,{payload}) => ({modify: payload}),
    [POST_SUBJECTS] : (state, {payload}) => ({regist: payload}),
    [DELETE_SUBJECT] : (state, {payload}) => ({delete1: payload}),
    [GET_SEARCH] : (state, {payload}) => ({search : payload})
},initialState);

export default SubjectReducer;