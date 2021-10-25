import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from "classnames"
import {delFlashMessage} from "../../store/actions/AddFlashMessage"
import "./index.css"
class Flash extends Component {
    delMessage = (key)=>{
        return ()=>{this.props.delFlashMessage(key)}
    }
    render() {
        const messages = this.props.message
        const messageList = messages.map((item)=>(
            <div key={item.id} className={classnames("alert",{"alert-success":item.type==="success"})} role="alert">
                {item.message} <div className="inline" onClick={this.delMessage(item.key)}>&times;</div>
            </div>
        ))
        return (
            <div className="container">
                {messageList}  
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        message:state.flashMessage
    }
}
const mapActionToProps = {
    delFlashMessage:delFlashMessage
}
export default connect(mapStateToProps,mapActionToProps)(Flash)