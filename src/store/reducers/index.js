import {combineReducers} from "redux"
import flashMessage  from "./flashMessage"
import auth from "./auth"
import account from "./account"
import admin from "./admin"
import recodePro from "./recodePro"
import market from "./market"
export default combineReducers({
    auth,flashMessage,account,admin,recodePro,market
})

