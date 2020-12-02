import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionType';
import axios from 'axios';

export const loginUserRequest = (payload) => ({
    type: LOGIN_USER_REQUEST,
    payload
});

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload
});

export const loginUserFailure = (payload) => ({
    type: LOGIN_USER_FAILURE,
    payload
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});


export const userLogin = (payload) => async (dispatch) => {
    dispatch(loginUserRequest());
    const { email, password } = payload;
    try {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/admin/login',
            data: {
                email,
                password
            }
        });
        console.log('res', res);
        dispatch(loginUserSuccess(res.data));
        return true;
    } catch (err) {
        dispatch(loginUserFailure(err));
        return false;
    }
};
