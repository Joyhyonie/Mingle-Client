import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_CERTIS = "certi/GET_CERTIS";
const PATCH_CERTI = "certi/PATCH_CERTI";
const POST_CERTI = "certi/POST_CERTI";

export const {
    certi : { getCertis,patchCerti,postCerti } }= createActions({
        [GET_CERTIS] : (res) => res.data,
        [PATCH_CERTI] : (res) => res,
        [POST_CERTI] : res => res
});

const CertiReducer = handleActions({
    [GET_CERTIS] : (state, {payload}) => payload,
    [PATCH_CERTI] : (state, {payload}) => payload,
    [POST_CERTI] : (state, {payload}) => ({regist: payload})
},initialState)

export default CertiReducer;
