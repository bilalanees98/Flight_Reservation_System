import React, { Component } from 'react'
import '../styles/login-signup.css'
import { Link } from 'react-router-dom';
import avatar from '../resources/avatar.svg'
import destination from '../resources/destination.svg'
import axios from 'axios';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom'

class login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            inCompleteFields: false,
            loading:false
        }
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        console.log("Hello name")
        this.setState({
            email: event.target.value
        });
    }

    handlePassChange(event) {
        console.log("hello password")
        this.setState({
            password: event.target.value
        });
    }
    
    handleSubmit(event) {
        
        event.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            this.setState({
               inCompleteFields:true
           }) 
        } else {
            this.setState({
                loading:true
            })
            axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            email: this.state.email,
            password: this.state.password,
            message: "Login",
        }).then((res) => {
            console.log(res.data);
            
            this.props.storeUserToken(res.data);
            this.props.changeLoginStatus();
            if (this.props.token != "") {
                return <Redirect to='/'  />
            }
            this.setState({
                loading:false
            })
        })
            .catch((error) => {
                console.log(error)
                this.setState({
                    error: true,
                    inCompleteFields: false,
                    loading:false
                })
                
               
                if (error.response) {
                    if (error.response.state == 400) {
                       console.log("er ror 400")
                        this.setState({
                            error: true,
                            inCompleteFields:false
                        })   
                    }
                    
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
            
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
        const{loading}=this.state
        console.log(this.props)
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
                            <h5 className={"error" + (this.state.error ? "show" : "")}>Incorrect password or email!! Try Again</h5>
                            <h5 className={"error" + (this.state.inCompleteFields ? "show" : "")}>Some fields are empty.</h5>
                            <div className="input-div one">
                                <div className="i">
                                <i class="fa fa-envelope-o fa-1x mailIcon" aria-hidden="true"></i>
                                </div>
                                <div className="div">
                                    <input placeholder="Email" type="email" className="mailinput" onChange={this.handleEmailChange} value={this.state.username} />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                <i class="fa fa-key fa-1x passIcon" aria-hidden="true"></i>
                                </div>
                                <div className="div">
                                    <input placeholder="password" type="password" className="passinput" onChange={this.handlePassChange} value={this.state.password} autoComplete="new-password" />
                                </div>
                            </div>
                        <Link to="/signup">No account</Link>
                            <a href="#">Forgot Password?</a>
                            
                            <button className="btn">
                                {/*<input type="submit" value="Login" />*/}
                                {loading && <i className="fa fa-refresh fa-spin"></i>}
                                {!loading &&  <span>   Login</span>}
                                {loading &&  <span>Logging in</span>}
                                
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
        storeUserToken: (key) => {
            dispatch({
                type: "STORE_TOKEN",
                key:key
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

export default connect(mapStateToProps ,mapDispatchToProps)(login)