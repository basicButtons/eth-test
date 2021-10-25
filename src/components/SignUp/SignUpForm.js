import React, { Component } from 'react'
import PropTypes from "prop-types"
import classnames from "classnames"
import {withRouter} from "react-router-dom"
class SignUpForm extends Component {
    state = {
        username : "",
        email:"",
        password:"",
        passwordConfirmation:"",
        errors:{},
        isLoading:false
    }
    static propsTypes={
        userSignupRequest:PropTypes.func.isRequired
    }
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = (e)=>{
        e.preventDefault()
        
        this.setState({errors:{},isLoading:true})
        this.props.userSignupRequest({
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            passwordConfirmation:this.state.passwordConfirmation
        }).then(
            ()=>{
                this.props.addFlashMessage({
                    type:"success",
                    text:"You signed up successfully, welcome!"
                })
                this.props.history.push("/");
            },
            ({response})=>{this.setState({errors:response.data,isLoading:false})}
        )
    }
    onBlur=(e)=>{
        this.props.checkName(e).then(({data})=>{
            const errors = this.state.errors
            errors.username = data.userName
            this.setState({errors})
        })
    }
    render() {
        const {errors}= this.state
        return (
            <form onSubmit = {this.onSubmit}>
                <h1>jion our community</h1>
                <div className="form-group">
                    <label className="control-label">UserName</label>
                    <input
                        value = {this.state.username}
                        onChange ={this.onChange}
                        type = "text"
                        name = "username"
                        onBlur = {this.onBlur}
                        className={classnames("form-control",{"is-invalid":errors.username})}
                        autoComplete="off"
                    />  
                    {errors.username  &&  <span className="form-text text-muted">{ errors.username }</span>} 
                </div>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value = {this.state.email}
                        onChange ={this.onChange}
                        type = "email"
                        name = "email"
                        className={classnames("form-control",{"is-invalid":errors.email})}
                        autoComplete="off"
                    />   
                    {errors.email  &&  <span className="form-text text-muted">{ errors.email }</span>} 
                </div>
                
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value = {this.state.password}
                        onChange ={this.onChange}
                        type = "password"
                        name = "password"
                        className={classnames("form-control",{"is-invalid":errors.password})}
                        autoComplete="off"
                    /> 
                    {errors.password  &&  <span className="form-text text-muted">{ errors.password }</span>}   
                </div>
                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value = {this.state.passwordConfirmation}
                        onChange ={this.onChange}
                        type = "password"
                        name = "passwordConfirmation"
                        autoComplete="off"
                        className={classnames("form-control",{"is-invalid":errors.passwordConfirmation})}
                    />   
                    {errors.passwordConfirmation  &&  <span className="form-text text-muted">{ errors.passwordConfirmation }</span>} 
                </div>
                <div className="from-group">
                        <button className="btn btn-primary btn-lg" 
                            disabled = {this.state.isLoading}
                        >
                            Sign Up
                        </button>
                </div>
            </form>
        )
    }
}
// withrouter 将该组件变为路由组件。
export default withRouter(SignUpForm)