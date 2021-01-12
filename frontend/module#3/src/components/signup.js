import React, { Component } from 'react'
import '../styles/login-signup.css'
import avatar from '../resources/avatar.svg'
import destination from '../resources/destination.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom'

class signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
            email: '',
            inCompleteFields: false,
            differentPassword: false,
            loading: false,
            showAccountPage:false
        }
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePassChange1 = this.handlePassChange1.bind(this);
        this.handlePassChange2 = this.handlePassChange2.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        console.log("Hello name")
        this.setState({
            username: event.target.value,
            
        });
    }

    handlePassChange1(event) {
        console.log("hello password")
        this.setState({
            password1: event.target.value
        });
    }
    handlePassChange2(event) {
        console.log("hello password")
        this.setState({
            password2: event.target.value
        });
    }
    handleEmailChange(event) {
        console.log("hello password")
        this.setState({
            email: event.target.value
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        alert('A username ' + this.state.username + "Password" + this.state.password1 + "Email is:" + this.state.email);
        // this.props.changeLoginStatus();
        if (this.state.username === "" || this.state.email === "" || this.state.password1 === "" || this.state.password2 === "") {
            this.setState({
                inCompleteFields: true
            })
        } else if (this.state.password1 !== this.state.password2) {
            console.log("Different password")
            this.setState({
                differentPassword:true
            })
        } else {
            this.setState({
                loading:true
            })
            axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2,
            email:this.state.email,
            message : "Signup",
            }).then((res) => {
                console.log(res.data);
                this.props.storeUserToken(res.data);
                this.props.changeLoginStatus();
                this.setState({
                    loading: false,
                    showAccountPage:true
                })
            }).catch((error) => {
                
                console.log(error)
                this.setState({
                    loading:false
                })
            } ) ;
        }
    }    

    componentDidMount() {
        
    if (window.location.pathname == '/') {
        this.props.changeHomeScreenStatus(true)  
      } else {
        this.props.changeHomeScreenStatus(false)
      }
    }


    
    render() {
        if (this.props.token != "") {
            return <Redirect to='/'  />
       }
        const { userClick } = this.state
        const { loading } = this.state
        const {showAccountPage}=this.state
        console.log("The Value of userClick is ")
        console.log(userClick)
        return (
            <div className="wrapper1">
                <div className="container1">
                    <div className="img">
                        <img src={destination}/>
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.handleSubmit}>
                        <img src={avatar}/>
                            <h2 className="title">Welcome</h2>
                            {/* {`box ${isBoxVisible ? "" : "hidden"`}} */}
                            <h5 className={"error" + (this.state.differentPassword ? "show" : "")}>Password and Confirm Password are not matching.</h5>
                            <h5 className={"error" + (this.state.inCompleteFields ? "show" : "")}>Some fields are empty.</h5>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    {/* <h5>Username</h5> */}
                                    <input placeHolder="Name" type="text" className="input" onChange={this.handleNameChange} value={this.state.username} />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <input placeholder="Password" type="password" onChange={this.handlePassChange1} value={this.state.password1} autoComplete="new-password" />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <input placeholder="Confirm Password" type="password" onChange={this.handlePassChange2} value={this.state.password2} autoComplete="new-password" />
                                </div>
                            </div>
                            <div className="input-div email">
						        <div className="i"> 
						            <i className="fas fa-mail"></i>
						        </div>
						        <div className="div">
						            
						            <input placeholder="Email" type="email" onChange={this.handleEmailChange} value={this.state.email} autoComplete="new-password" />
                                </div>
                            </div>
                            <a><Link to="/login">Already have an account?</Link></a>
                            
                            <button className="btn">
                            {loading && <i className="fa fa-refresh fa-spin"></i>}
                            {!loading &&  <span>Sign up</span>}
                            {loading &&  <span>Creating</span>}
                                </button>
                            
                            </form>
                </div>
            </div>
        </div>
            
        );

    }
}

const mapStateToProps = (state) => {
    return {
        token:state.key
    }
  }
  

//change login status
const mapDispatchToProps = (dispatch) =>{
    return {
        changeLoginStatus: () => {
            dispatch({
                type: "LOGIN_IN",
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


export default connect(mapStateToProps,mapDispatchToProps)(signup)