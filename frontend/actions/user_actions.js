import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER"

export const receiveUser = (user) => ({
    type: RECEIVE_USER, 
    user
})

export const fetchUser = user => dispatch => (
    UserAPIUtil.fetchUser(user).then(user => (
        dispatch(receiveUser(user))
    ))
)