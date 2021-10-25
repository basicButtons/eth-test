import axios from "axios"
import {GET_ADMIN_INFO} from "./ActionType"
export const getAdminInfo = () => {
    return (dispatch) => {
        return axios.post("/api/admin/admininfo").then((msg)=>{
            console.log(msg)
            let action = {}
            action.data = msg.data
            action.type = GET_ADMIN_INFO
            dispatch(action)
        })
    }
}

export const agreeItem = (item) => {
    return (dispatch) => {
        return axios.post("/api/admin/agreeitem",item).then(()=>{
            return axios.post("/api/admin/admininfo")
        })
        .then((msg)=>{
            let action = {}
            action.data = msg.data
            action.type = GET_ADMIN_INFO
            dispatch(action)
        })


    }
}

export const disagreeItem = (key) => {
    return (dispatch) => {
        return axios.post("/api/admin/disagreeitem",{key}).then((msg)=>{
            console.log(msg)
            })
        } 
}

