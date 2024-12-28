import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const accountService = {
    get_full_eod_data,
    get_eod_data,
    submitAccountEODData,
    get_shop_expenses,
    update_shop_expenses
}

function get_full_eod_data(postData) {
    return APIHelper.Post(APIUrlConstants.SHOP_FULL_EOD_DATA, postData, authHeader())
}

function get_eod_data(postData) {
    return APIHelper.Post(APIUrlConstants.SHOP_EOD_DATA, postData, authHeader())
}


function submitAccountEODData(postData) {
    return APIHelper.Post(APIUrlConstants.SUBMIT_ACCOUNT_DATA, postData, authHeader())
}

function get_shop_expenses(postData) {
    return APIHelper.Post(APIUrlConstants.GET_SHOP_EXPENSES, postData, authHeader())
}

function update_shop_expenses(postData) {
    return APIHelper.Post(APIUrlConstants.UPDATE_SHOP_EXPENSE, postData, authHeader())
}
