import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const userService = {
    getUserInformation
}


function getUserInformation() {
    return APIHelper.Get(APIUrlConstants.USER_INFO, authHeader());
}
