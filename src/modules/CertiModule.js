import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_CERTIS = "certi/GET_CERTIS";

export const {
    certi : { getCertis } }= createActions({
        [GET_CERTIS] : (res) => res.data
});

const CertiReducer = handleActions({
    [GET_CERTIS] : (state, {payload}) => payload
},initialState)

export default CertiReducer;
