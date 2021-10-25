import axios from "axios";

const setValidationToken = (token) =>{
    if(token){
        axios.defaults.headers.common['Authorization'] = "bear "+token;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setValidationToken;