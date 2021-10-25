import {ADD_FLASH_MESSAGE, DEL_FLASH_MESSAGE} from "../actions/ActionType"
import {nanoid} from "nanoid"
const flashMessage = (state = [], action) => {
    switch (action.type) {
    case ADD_FLASH_MESSAGE:
        return [ ...state, {
            id:nanoid(),
            type:action.message.type,
            message:action.message.text
        } ]
    case DEL_FLASH_MESSAGE:
        return state.filter((item)=>{
            return item.key !== action.key
        })
    default:
        return state
    }
}
export default flashMessage