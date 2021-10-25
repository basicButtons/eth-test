import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from  "react-redux"
import {logOut} from "../../store/actions/LogInAction"
import "./index.css"
class Navbar extends Component {
    logoutUser= ()=>{
        localStorage.removeItem("jwtToken")
        this.props.logOut()
    }
    render() {
        const {auth} = this.props
        const userLinks = (
            <div className="collapse navbar-collapse" id="navbarsExample09">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <Link className="nav-link" to="/" onClick={this.logoutUser}>Log out<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/market" >Market<span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
            </div>
        )
        const guestLinks = (
            <div className="collapse navbar-collapse" id="navbarsExample09">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            {/* <Link className="nav-link" to="/login">Log in <span className="sr-only">(current)</span></Link> */}
                            </li>
                            <li className="nav-item">

                            </li>
                        </ul>
            </div>
        )
        return (
            <div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg  rounded">
                    
                        <Link className="navbar-brand" to="/">Navbar</Link>

                        {auth ? userLinks : guestLinks}
                    </nav>
                </div>
            </div>
        )
    }
}
const mapStateFromProps = (state)=>{
    return {
        auth : state.auth.isAuthenticated,
        user :state.auth.user
    }
}

export default connect(mapStateFromProps,{logOut})(Navbar)