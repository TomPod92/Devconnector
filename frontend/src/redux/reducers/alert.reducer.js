// Reducery to FUNKCJE, które jako argument przyjmują "state" oraz "action"
import  { SET_ALERT, REMOVE_ALERT } from '../actions/types.js';

const initialState = [];

const alertReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ALERT:
            return [...state, { id: action.id, msg: action.msg, alertType: action.alertType }];
            // // Sposób z "payload"
            // return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(current => current.id !== action.id);
        default:
            return state;
    }
};

export default alertReducer;