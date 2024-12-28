import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const dashboardService = {
    dashboardData
}

function dashboardData(data) {
    return APIHelper.Post(APIUrlConstants.DASHBOARD_LIST, data, authHeader());
}
