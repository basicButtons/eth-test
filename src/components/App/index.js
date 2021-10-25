import './App.css'
import React, { Component } from 'react'
import Nav from "../Navbar"
import {Route} from "react-router-dom"
import Login from "../Login"
import SignUp from "../SignUp"
import Flash from "../Flash"
import Manage from "../Manage"
import {connect} from  "react-redux"
import Admin from "../Admin"
import Market from "../Market"
import Main from "../Main"
import 'antd/dist/antd.css'
import Tending from "../Market/graph"
class App extends Component {
  render() {
    const {auth,type} = this.props
    const guestRouters = (
      <div className ="wraper-out">
        <Nav/>
        <div className="log-box">
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
        </div>
      </div>
    )
    const userRouters = (
      <Main type = {type}>
        <div className="container">
                    <Route path="/manage" component={Manage}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/market" component={Market} />
                    <Route path="/tending" component={Tending} />
        </div>
      </Main>
    )
    const admin = (
      <Main type = {type}>
        <div className="container">
              <Route path="/signup" component={SignUp}/>
              <Route path="/admin" component={Admin}/>
        </div>
      </Main>
    )
    const rechoose =(type==="user"?userRouters:admin)
    return (
      <div className="App">
        {auth? rechoose :guestRouters}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    auth:state.auth.isAuthenticated,
    type:state.auth.user.type
  }
}
export default connect(mapStateToProps)(App);




