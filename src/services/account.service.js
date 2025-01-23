import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const accountService = {
    get_full_eod_data,
    get_eod_data,
    submitAccountEODData,
    saveAccountEODData,
    approveAccountEODData,
    rejectAccountEODData,
    get_shop_expenses,
    update_shop_expenses,
    delete_expense,
    get_shop_advances,
    insert_shop_advance,
    delete_shop_advance,
    get_kobc_employee_list,
    save_shop_attendance,
    get_shop_attendance,
    get_dp_entries,
    save_dp_entry,
    delete_dp_entry,
    search_dp_persons
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

function saveAccountEODData(postData) {
    return APIHelper.Post(APIUrlConstants.SAVE_ACCOUNT_DATA, postData, authHeader())
}

function approveAccountEODData(postData) {
    return APIHelper.Post(APIUrlConstants.APPROVE_ACCOUNT_DATA, postData, authHeader())
}

function rejectAccountEODData(postData) {
    return APIHelper.Post(APIUrlConstants.REJECT_ACCOUNT_DATA, postData, authHeader())
}

function get_shop_expenses(postData) {
    return APIHelper.Post(APIUrlConstants.GET_SHOP_EXPENSES, postData, authHeader())
}

function update_shop_expenses(postData) {
    return APIHelper.Post(APIUrlConstants.UPDATE_SHOP_EXPENSE, postData, authHeader())
}

function delete_expense(postData) {
    return APIHelper.Post(APIUrlConstants.DELETE_SHOP_EXPENSE, postData, authHeader())
}

function get_shop_advances(postData) {
    return APIHelper.Post(APIUrlConstants.GET_SHOP_ADVANCES, postData, authHeader())
}

function insert_shop_advance(postData) {
    return APIHelper.Post(APIUrlConstants.INSERT_SHOP_ADVANCE, postData, authHeader())
}

function delete_shop_advance(postData) {
    return APIHelper.Post(APIUrlConstants.DELETE_SHOP_ADVANCE, postData, authHeader())
}

function get_kobc_employee_list() {
    return APIHelper.Get(APIUrlConstants.GET_KOBC_EMPLOYEE_LIST, authHeader())
}

function save_shop_attendance(postData) {
    return APIHelper.Post(APIUrlConstants.SAVE_SHOP_ATTENDANCE, postData, authHeader())
}

function get_shop_attendance(postData) {
    return APIHelper.Post(APIUrlConstants.GET_SHOP_ATTENDANCE, postData, authHeader())
}


function get_dp_entries(postData) {
    return APIHelper.Post(APIUrlConstants.GET_DP_ENTRIES, postData, authHeader())
}

function save_dp_entry(postData) {
    return APIHelper.Post(APIUrlConstants.SAVE_DP_ENTRY, postData, authHeader())

}

function delete_dp_entry(postData) {
    return APIHelper.Post(APIUrlConstants.DELETE_DP_ENTRY, postData, authHeader())
}

function search_dp_persons(postData) {
    return APIHelper.Post(APIUrlConstants.SEARCH_DP_PERSONS, postData, authHeader())
}