import {GET_ACCOUNT,GET_RECODE_PROCESSION,PRIVATE_ACCOUNT,PUBLIC_ACCOUNT} from "./ActionType"
import {queryQuota_,toExchangeTransfer_} from "../../utils/web3"
import axios from "axios"
import jwtDecode from "jwt-decode"

export const getAcount =()=>{
    console.log("getaccount1")
    return (dispatch) =>{
        console.log("getaccount2")
        return axios.post("/api/users/queryaccount").then(
            async (accounts)=>{
                let res = {}
                res.pea = accounts.data[1]
                dispatch({type:PRIVATE_ACCOUNT,data:res})
            }
        ).then(async()=>{
            let info =jwtDecode(localStorage.jwtToken)
            console.log("==mx==")
            let quota = await queryQuota_(info.name)
            dispatch({type:PUBLIC_ACCOUNT,data:quota})
        })
    }
}

export const recharge =(amount)=>{
    return async (dispatch) =>{
        let info =jwtDecode(localStorage.jwtToken),
        result = await toExchangeTransfer_(info.name,"",amount)
        console.log(result)
        return axios.post("/api/users/recharge",{data:amount})
    }
}

export const withdraw =(data)=>{
    return (dispatch) =>{
        return axios.post("/api/users/withdraw",{data})
    }
}

export const remit =(data)=>{ 
    return (dispatch) =>{
        return axios.post("/api/users/remit",data).then(
            ()=>{}
        )
    }
}

export const check =(data)=>{ 
    return (dispatch) =>{
        return axios.post("/api/users/check",{data}).then(
            ()=>{}
        )
    }
}

export const getRecodeAndProcession = ()=>{
    return (dispatch) => {
        return axios.get("/api/users/getrecpro").then((msg)=>{
            const infoList = msg.data
            console.log("更新记录列表")
            dispatch({type:GET_RECODE_PROCESSION,data:infoList})
        })
    }
}