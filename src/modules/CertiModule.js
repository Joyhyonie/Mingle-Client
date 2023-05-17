import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_CERTIS = "certi/GET_CERTIS";
const PATCH_CERTI = "certi/PATCH_CERTI";

export const {
    certi : { getCertis,patchCerti } }= createActions({
        [GET_CERTIS] : (res) => res.data,
        [PATCH_CERTI] : (res) => res
});

const CertiReducer = handleActions({
    [GET_CERTIS] : (state, {payload}) => payload,
    [PATCH_CERTI] : (state, {payload}) => payload
},initialState)

export default CertiReducer;
