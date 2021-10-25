import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./login.css"

class LoginForm extends Component {

    state = {
        username:"",
        password:"",
        email:"",
        errors:{},
        isLoading:false
    }

    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }


    onSubmit =(e)=>{
        e.preventDefault()
        console.log("send")
        this.setState({"isLoading":false})
        this.setState({email:this.state.username},()=>{
            this.props.loginVerify(this.state).then(
                (msg)=>{
                        console.log("msg",msg)
                        if(msg.error){
                            this.setState({isLoading:true})
                            this.setState({errors:msg.error})
                            console.log(this.state.errors)
                        }
                        else if(msg.type === "user"){
                            this.props.history.push("/manage")
                        }else if(msg.type === "manager"){
                            console.log("1111")
                            this.props.history.push("/admin")
                        }
                }
            )
        })

    }
    goToSignUp = ()=>{
        var box = document.getElementById("box");
        var zbox = document.getElementById("zbox");
        box.style.transform = "translate(-50%,-50%) rotate(-90deg)";
        box.style.transition ="transform .5s ease";
        zbox.style.transform = "translate(-50%,-50%) rotate(0deg)";
        zbox.style.transition = "transform .5s ease";
    }
    goBack = ()=>{
        var box = document.getElementById("box");
        var zbox = document.getElementById("zbox");
        box.style.transform = "translate(-50%,-50%)";
        zbox.style.transform = "translate(-50%,-50%) rotate(90deg)";
    }

    render() {
        const {errors} = this.state
        return (
            <div className="login">
        <div className="outbox">
            <div className="box" id="box">
                <h1>LOGIN</h1>
                <div className="inbox">
                    <form action="" onSubmit = {this.onSubmit}>
                        <input type="text"  id="user" placeholder="Username" className="text user" 
                            value = {this.state.username}
                            onChange ={this.onChange}
                            name = "username"
                            autoComplete="off"
                        />
                        {errors.username  &&  <span className="form-text text-muted">{ errors.username }</span>} 
                        <input type="password"  id="pass" placeholder="Password" className="text password" 
                            value = {this.state.password}
                        onChange ={this.onChange}
                        name = "password"
                        autoComplete="off"
                        />
                        {errors.password  &&  <span className="form-text text-muted">{ errors.password }</span>} 
                        <button value="Login" className="btn1" id="btn"
                        disabled = {this.state.isLoading}>Login</button>
                        <div className="go" id="go"><span onClick={this.goToSignUp} href = "" >NO account yet? Signup</span></div>
                    </form>
                </div>
            </div>
            <div className="zcbox" id="zbox">
                <div className="back" id="back"><span onClick={this.goBack}>back&lt;</span></div>
                <h1>SIGNUP</h1>
                <div className="inbox">
                <form >
                
                <input type="text" id="newuser" 
                            placeholder="Please Input Username" 
                            className="intext" 
                            autoComplete="off"
                            value = {this.state.newusername}
                            onChange ={this.onChange}
                            name = "newusername"
                            onBlur = {this.onBlur}
                        />
                {errors.newusername  &&  <span className="form-text text-muted">{ errors.newusername }</span>} 
                <input type="text" id="newpass" 
                            placeholder="Plase Input Password" 
                            className="intext" 
                            autoComplete="off"
                            value = {this.state.newpassword}
                            onChange ={this.onChange}
                            name = "newpassword"
                            onBlur = {this.onBlur}
                        />
                {errors.newusername  &&  <span className="form-text text-muted">{ errors.newusername }</span>}
                <input type="text" name="newpassconfirmation" id="newpass" 
                            placeholder="Plase Confirm Password" 
                            className="intext" 
                            autoComplete="off"
                            value = {this.state.newpassword}
                            onChange ={this.onChange}
                            onBlur = {this.onBlur}
                        />
                {errors.newusername  &&  <span className="form-text text-muted">{ errors.newusername }</span>}

                    <input type="button" value="Signup" className="inbtn" id="newbtn" disabled = {this.state.isLoading}/>
                </form>
                </div>
            </div>
        </div>
        </div>
        )

            {/* <form onSubmit = {this.onSubmit}>
                <h1>Log In</h1>
                <div className="form-group">
                    <label className="control-label">UserName</label>
                    <input
                        value = {this.state.username}
                        onChange ={this.onChange}
                        type = "text"
                        name = "username"
                        className={classnames("form-control",{"is-invalid":errors.username})}
                        autoComplete="off"
                    />  
                    {errors.username  &&  <span className="form-text text-muted">{ errors.username }</span>} 
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
                <div className="from-group">
                        <button className="btn btn-primary btn-lg" 
                            disabled = {this.state.isLoading}
                        >
                            Log In
                        </button>
                </div>
            </form> */}
        
    }
}

export default withRouter(LoginForm)
