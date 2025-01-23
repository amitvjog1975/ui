const APIUrlConstants = {
    AUTHENTICATE_LOGIN: "auth/validate-login",
    AUTHENTICATE_TOKEN: "auth/is-valid",
    USER_INFO: "user/get-info",
    DASHBOARD_LIST: "dashboard/get-shop-list",
    SHOP_LIST: "shop/get-list",
    SHOP_FULL_EOD_DATA: "dailyaccount/get-full-eod-data",
    SHOP_EOD_DATA: "dailyaccount/get-shop-eod-data",
    SUBMIT_ACCOUNT_DATA: "dailyaccount/submit-approve-eod-data",
    SAVE_ACCOUNT_DATA: "dailyaccount/save-draft-eod-data",
    APPROVE_ACCOUNT_DATA: "dailyaccount/approve-eod-data",
    REJECT_ACCOUNT_DATA: "dailyaccount/reject-eod-data",

    MASTER_DATA: "master/getAll",
    GET_SHOP_EXPENSES: "expense/get-shop-expenses",
    UPDATE_SHOP_EXPENSE: "expense/update-shop-expense",
    DELETE_SHOP_EXPENSE: "expense/delete-shop-expense",

    GET_SHOP_ADVANCES: "advance/get-shop-advances",
    INSERT_SHOP_ADVANCE: "advance/insert-shop-advance",
    DELETE_SHOP_ADVANCE: "advance/delete-shop-advance",

    SAVE_SHOP_ATTENDANCE: "attendance/save-shop-attendance",
    GET_SHOP_ATTENDANCE: "attendance/get-shop-attendance",

    GET_DP_ENTRIES: "dp/get-dp-entries",
    SAVE_DP_ENTRY: "dp/save-dp-entry",
    DELETE_DP_ENTRY: "dp/delete-dp-entry",
    SEARCH_DP_PERSONS: "dp/search-dp-persons",

    GET_KOBC_EMPLOYEE_LIST:  "employee/get-kobc-employees-list",
}

export default APIUrlConstants;