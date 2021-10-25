import {SELL_INFO, BUY_INFO,MARKET_INFO,ALL_INFO,DEL_INFO} from "../actions/ActionType"
import {nanoid} from "nanoid"

const flashMessage = (state = [], action) => {
    switch (action.type) {
    case ALL_INFO:
        return [...action.data]
    case MARKET_INFO:
        return [action.message,...state]
    case DEL_INFO:
        return [...state].filter(item => item.key !== action.data)
    default:
        return state
    }
}
export default flashMessage