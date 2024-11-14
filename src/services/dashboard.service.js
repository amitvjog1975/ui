import React, { useState, useEffect } from "react";
import { useUserContext } from "react";
import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";
import Cookies from "js-cookie";

export const dashboardService = {
    dashboardData
}

function dashboardData(data) {
    return APIHelper.Post(APIUrlConstants.DASHBOARD_LIST, data, authHeader());
}
