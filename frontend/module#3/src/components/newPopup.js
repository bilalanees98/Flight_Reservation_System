import React, { Component } from 'react'
import '../styles/login-signup.css'

class Npop extends Component{

    constructor(props) {
        super(props);
        this.state = {
            heading: this.props.heading,
            para: this.props.para,
        }        
    }
    render() {
        return (
          < div className = "modal" >
                <a href="/" className="close" onClick={Npop}>
                    &times;
                </a>
                <div className="header"><h2> {this.state.heading} </h2></div>
                <div className="content">
                    <p>{this.state.para}</p>
                </div>
            </div>
        ) 
    }
}

export default Npop;