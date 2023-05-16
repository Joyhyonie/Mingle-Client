import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_CERTIS = "certi/GET_CERTIS";
const PUT_CERTI = "certi/PUT_CERTI";

export const {
    certi : { getCertis,putCerti } }= createActions({
        [GET_CERTIS] : (res) => res.data,
        [PUT_CERTI] : (res) => res
});

const CertiReducer = handleActions({
    [GET_CERTIS] : (state, {payload}) => payload,
    [PUT_CERTI] : (state, {payload}) => payload
},initialState)

export default CertiReducer;
