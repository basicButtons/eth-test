import axios from "axios"
import setValidationToken from "../../utils/validation/setValidationToken"
import jwtDecode from "jwt-decode"
import {SET_CURRENT_USER} from "./ActionType"

export const setCurrentUser = (user)=>{
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export const logOut = ()=>{
    return {
        type:SET_CURRENT_USER,
        user:{}
    }
}

export const loginVerify = (data)=>{
    return (dispatch) =>{
       return axios.post("/api/users/loginverify",data).then(
           res=>{
                const token = res.data.token
                if(token){
                    localStorage.setItem("jwtToken",token)
                    setValidationToken(token)
                    console.log(jwtDecode(token))
                    dispatch(setCurrentUser(jwtDecode(token)))
                    return jwtDecode(token)
                }
                else{
                    return res.data
                }
           }
       )
    }
}
