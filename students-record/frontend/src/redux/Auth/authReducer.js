import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionType';
import { loadData, saveData, removeData } from '../localStorage';

let initState = {
    error: false,
    accessToken: "",
    isAuth: false,

};

let accessToken = loadData('accessToken');
if (accessToken) {
    initState = {
        ...initState,
        isAuth: true,
        accessToken: accessToken
    };
}



const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                error: false
            };

        case LOGIN_USER_SUCCESS:
            saveData('accessToken', payload.accessToken);
            return {
                ...state,
                accessToken: payload.accessToken,
                error: false,
                isAuth: true,
                
            };

        case LOGIN_USER_FAILURE:
            return {
                ...state,
               
                error: true,
                
            };
        case LOGOUT_USER:
            removeData('accessToken');
            return {
                ...state,
                isAuth: false,
                error: false,
               
            };

       

        default:
            return state;
    }
};

export default authReducer;

