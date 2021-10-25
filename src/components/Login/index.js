import React, { Component } from 'react'
import { connect } from 'react-redux'
import  LoginForm from "./LoginForm"
import  {addFlashMessage} from "../../store/actions/AddFlashMessage"
import {loginVerify} from "../../store/actions/LogInAction"
class Login extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="row">
                    <div  className="col-md-3">

                    </div>
                    <div  className="col-md-6">
                        <LoginForm
                            addFlashMessage={this.props.addFlashMessage}
                            loginVerify = {this.props.loginVerify}
                        />
                    </div>
                    <div className="col-md-3"></div>
                </div>
                </div>
            </div>
        )
    }
}
export default connect(null,{addFlashMessage,loginVerify})(Login)
