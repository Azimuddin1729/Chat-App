export const SERVER= import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES="api/auth"
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`
export const GET_USER_INFO_ROUTE =`${AUTH_ROUTES}/userinfo`

export const UPDATE_PROFILE_ROUTE=`${AUTH_ROUTES}/profile-update`

export const PROFILE_IMAGE_ROUTE=`${AUTH_ROUTES}/profile-img-add`

export const PROFILE_IMAGE_DELETE=`${AUTH_ROUTES}/profile-img-remove`

export const LOGOUT_ROUTE=`${AUTH_ROUTES}/logout`

export const CONTACTS_ROUTES="/api/contacts"
export const SEARCH_CONTACTS_ROUTE=`${CONTACTS_ROUTES}/search`
export const GET_DMCONTACTS_ROUTE=`${CONTACTS_ROUTES}/get-dmcontacts`


export const MESSAGES_ROUTE="/api/messages"
export const GET_MESSAGES_ROUTE=`${MESSAGES_ROUTE}/get-messages`

export const UPLOAD_FILE_ROUTE=`${MESSAGES_ROUTE}/upload-file`;