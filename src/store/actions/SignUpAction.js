import axios from "axios"

export const userSignupRequest = (userdata) => {
    return (dispatch)=>{
        return axios.post("/api/users/",userdata)
    }
}
export const checkName = (e) =>{
    const userName = e.target.value
    return dispatch=>{
        return axios.post("/api/users/checkname",{"userName":userName})
    }
}