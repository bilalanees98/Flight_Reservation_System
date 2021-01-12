import React, { Component } from 'react'
import '../styles/style.css'
import { Link } from 'react-router-dom';
import avatar_user from '../resources/avatar-user-1.svg'
import { connect } from 'react-redux';

class navbar extends Component{

    signOut = () => {
        console.log("Signout is requested")
        this.props.changeLoginStatus()
    }
    changeStatus=()=> {
        this.props.changeHomeScreenStatus(true)
    }
    componentDidMount() {
        console.log(window.location.pathname);
    if (window.location.pathname == '/') {
      this.props.changeHomeScreenStatus(true)  
    } else {
      this.props.changeHomeScreenStatus(false)
    }
    
    }
    render() {
        return (
            <div className="wrapper">
                <header>
                    <img className="logo" src={require("../resources/logo.svg")} alt="company-logo-hy" />
                    <nav>
                    <ul className="nav_links">
                        <li><a href="/" onClick={this.changeStatus}><Link to="/">Home</Link></a></li>
                        <li><a href="/" onClick={this.changeStatus}><Link to="/">Services</Link></a></li>
                        <li><a href="/" onClick={this.changeStatus}><Link to="/">Contact us</Link></a></li>
                        <li className={"avatar-drop-down" + (this.props.isLogin ? "show" : "")} >
                            <a><Link to="/#">
                                <img src={avatar_user} /></Link>
                            </a>
                            <ul className="drop-down-content">
                                <li><a><Link to="/#">Edit my profile</Link></a></li>
                                <li><a><Link to="/history">My Flight records</Link></a></li>
                                <li><a ><Link to="/#" onClick={this.signOut}>Sign Out</Link></a></li>
                            </ul>
                        </li>    
 
                    </ul>
                    </nav>
                    
                    <Link to="/login" className={"login" + (this.props.isLogin ? "hide": "" )}><p>Login</p></Link>
                    
                </header>
                
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    console.log("The value of islogin in mapstatetoprop is " , state.isUserLogin)
    return {
        
        isLogin: state.isUserLogin
    }
}
//change login status
const mapDispatchToProps = (dispatch) =>{
    return {
        changeLoginStatus: () => {
            dispatch({
                type: "SIGN_OUT",
            })
        },
        changeHomeScreenStatus: (status) => {
            dispatch({
              type: "CHANGE_HOMESCREEN_STATUS",
              status: status
            })
        },
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(navbar)