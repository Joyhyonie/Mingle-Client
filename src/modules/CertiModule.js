import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_CERTIS = "certi/GET_CERTIS";
const PATCH_CERTI = "certi/PATCH_CERTI";
const POST_CERTI = "certi/POST_CERTI";
const GET_CERTIDOCNAME = 'certi/GET_CERTIDOCNAME';
const GET_MYCERTIDOCNAME = 'certi/GET_MYCERTIDOCNAME';

export const {
    certi : { getCertis,patchCerti,postCerti,getCertidocname,getMycertidocname } }= createActions({
        [GET_CERTIS] : (res) => res.data,
        [PATCH_CERTI] : (res) => res,
        [POST_CERTI] : res => res,
        [GET_CERTIDOCNAME] : res => res.data,
        [GET_MYCERTIDOCNAME] : res => res.data
});

const CertiReducer = handleActions({
    [GET_CERTIS] : (state, {payload}) => ({certi : payload}),
    [PATCH_CERTI] : (state, {payload}) => ({patch :payload}),
    [POST_CERTI] : (state, {payload}) => ({regist: payload}),
    [GET_CERTIDOCNAME] : (state, {payload}) => ({certiName : payload}),
    [GET_MYCERTIDOCNAME] : (state, {payload}) => ({myCertiSearchName : payload})
},initialState)

export default CertiReducer;
