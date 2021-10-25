import axios from "axios"
import {BUY_INFO,SELL_INFO,MARKET_INFO,ALL_INFO,DEL_INFO}from "./ActionType"

export const getSellInfo = ()=>{
    return (dispatch)=>{ 
        return axios.get("/api/users/buyinfo").then((msg)=>{
            let message = msg.data
            dispatch({type:BUY_INFO,message})
            }
        )
    }
}

export const getBuyInfo = () =>{
    return (dispatch)=>{ 
        return axios.get("/api/users/sellinfo").then((msg)=>{
            console.log(msg)
            let message = msg.data
            dispatch({type:BUY_INFO,message})
            }
        )
    }
}

export const getInfos  =()=>{
    return (dispatch) => {
        return Promise.all([axios.get("/api/users/sellinfo"),axios.get("/api/users/buyinfo")]).then(
            (msgs)=>{
                let datas = []
                msgs.forEach(item=>{
                    datas.push(...item.data)
                })
                console.log(datas)
                dispatch({type:ALL_INFO,data:datas})
            }
        )
    }
}

export const addMarketInfo = (data) =>{
    return (dispatch)=>{
        console.log(data)
        return axios.post("/api/users/marketinfo",data).then((msg)=>{
            let message = msg.data
            console.log(message)
            dispatch({type:MARKET_INFO,message})
            }
        )
    }
}

export const deleteDeal = (recode) => {
    return (dispatch) => {
        return axios.post("/api/market/delinfo",recode).then((key)=>{
            console.log(key.data)
            dispatch({
                type:DEL_INFO,
                data:key.data
            })
        })
    }
}

export const transDeal = (record) => {
    return (dispatch) => {
        console.log(record)
        return axios.post("/api/market/deal",record).then((msg)=>{
            console.log(msg)
        })
    }
}
