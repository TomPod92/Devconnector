import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types.js';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    const id = uuidv4();

    dispatch({
        type: SET_ALERT,
        msg: msg,
        alertType: alertType,
        id: id
    });

    setTimeout( () => {
        dispatch({ type: REMOVE_ALERT, id: id })
    }, timeout)
};

// // Sposób z "payload"
// export const setAlert = (msg, alertType) => dispatch => {
//     const id = uuidv4();

//     dispatch({
//         type: SET_ALERT,
//         payload: { msg, alertType, id }
//     });
// };
