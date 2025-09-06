export const SERVER= import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES="api/auth"
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`
export const GET_USER_INFO_ROUTE =`${AUTH_ROUTES}/userinfo`

export const UPDATE_PROFILE_ROUTE=`${AUTH_ROUTES}/profile-update`