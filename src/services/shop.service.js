import APIHelper from "../shared/APIHelper"
import APIUrlConstants from "../shared/APIUrlConstants";
import { authHeader } from "../shared/AuthHeader";

export const shopService = {
    getShopMasterList
}

function getShopMasterList() {
    return APIHelper.Get(APIUrlConstants.SHOP_LIST,authHeader());
}

