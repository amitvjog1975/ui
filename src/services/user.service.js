import React, { useState, useEffect } from "react";
import { useUserContext } from "react";
import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";
import Cookies from "js-cookie";

export const userService = {
    getUserInformation
}


function getUserInformation() {
    return APIHelper.Get(APIUrlConstants.USER_INFO, authHeader());
}
