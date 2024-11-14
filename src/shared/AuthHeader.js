import Cookies from "js-cookie";

export function authHeader() {
    let cookieDataStr = Cookies.get("kvsrsUser");
    if (cookieDataStr == null || cookieDataStr == undefined || cookieDataStr == "") {
        return {}
    } else {
        let userData = JSON.parse(cookieDataStr);
        return {
            Authorization: `Bearer ${userData.token}`
        };
    }
}