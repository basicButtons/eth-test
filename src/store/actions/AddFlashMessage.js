import {ADD_FLASH_MESSAGE,DEL_FLASH_MESSAGE} from "./ActionType"
export const addFlashMessage = (message) =>{
    return (dispatch)=>{ dispatch({
        type:ADD_FLASH_MESSAGE,
        message
    })
    }
}

export const delFlashMessage = (key) =>{
    return (dispatch)=>{ dispatch({
        type:DEL_FLASH_MESSAGE,
        key
    })
    }
}