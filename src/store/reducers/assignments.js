import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    assignments: [],
    currentAssignment: {},
    error: null,
    loading: false
};

const getASNTListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getASNTListSuccess = (state, action) => {
    return updateObject(state, {
        assignments: action.assignments,
        error: null,
        loading: false
    });
};

const getASNTListFail = (state, action) => {
    console.log('Ending with error')
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const getASNTDetailStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getASNTDetailSuccess = (state, action) => {
    return updateObject(state, {
        currentAssignment: action.assignment,
        error: null,
        loading: false
    });
};

const getASNTDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ASSIGNMENT_LIST_START:
            return getASNTListStart(state, action);
        case actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS:
            return getASNTListSuccess(state, action);
        case actionTypes.GET_ASSIGNMENTS_LIST_FAIL:
            return getASNTListFail(state, action);
        case actionTypes.GET_ASSIGNMENT_DETAIL_START:
            return getASNTDetailStart(state, action);
        case actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS:
            return getASNTDetailSuccess(state, action);
        case actionTypes.GET_ASSIGNMENT_DETAIL_FAIL:
            return getASNTDetailFail(state, action);
        default:
            return state;
    }
};

export default reducer;