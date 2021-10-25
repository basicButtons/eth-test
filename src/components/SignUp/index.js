import React, { Component } from 'react'
import {connect} from "react-redux"
import SignUpForm from "./SignUpForm"
import {userSignupRequest,checkName} from "../../store/actions/SignUpAction"
import {addFlashMessage} from "../../store/actions/AddFlashMessage"
import "./index.css"
class SignUp extends Component {
    render() {
        return (
            <div className="row">

                <div  className="col-md-6">
                    <SignUpForm userSignupRequest={this.props.userSignupRequest}
                        addFlashMessage={this.props.addFlashMessage}
                        checkName = {this.props.checkName}
                    ></SignUpForm>
                </div>

            </div>
        )
    }
}
export default connect(null,{userSignupRequest,addFlashMessage,checkName})(SignUp)