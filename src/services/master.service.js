import React, { useState, useEffect } from "react";
import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const masterService = {
    getMasterData
}

function getMasterData(postData) {
    return APIHelper.Post(APIUrlConstants.MASTER_DATA, postData, authHeader());
}
