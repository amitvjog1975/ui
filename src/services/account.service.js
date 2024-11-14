import React, { useState, useEffect } from "react";
import { useContext } from "react";
import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";
import Cookies from "js-cookie";

export const accountService = {
    getAccountHeadData,
    submitAccountEODData
}

function getAccountHeadData(postData) {
    return APIHelper.Post(APIUrlConstants.ACCOUNT_DATA, postData, authHeader())
}

function submitAccountEODData(postData) {
    return APIHelper.Post(APIUrlConstants.ACCOUNT_DATA, postData, authHeader())
}
