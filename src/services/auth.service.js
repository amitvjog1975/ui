import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const authService = {
    authenticateLogin,
    isValid
}

function authenticateLogin(data) {
    return APIHelper.Post(APIUrlConstants.AUTHENTICATE_LOGIN, data, authHeader());
}

function isValid() {
    return APIHelper.Get(APIUrlConstants.AUTHENTICATE_TOKEN, null, authHeader());
}