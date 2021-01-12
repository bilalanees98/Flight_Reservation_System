import React, { Component } from 'react'
import '../styles/contactus.css'

class contactUs extends Component {

    render() {
        return (
            <div className="contactus" id="contactus">
		        <h1 className="title">Contact us</h1>
		        <div className="form_wrapper">
			        <div className="form_input">
				        <input type="text" placeholder="Email"/>
			        </div>
			        <div className="form_input">
				        <input type="text" placeholder="Subject"/>
			        </div>
			        <div className="form_input">
				        <textarea placeholder="Message"></textarea>
			        </div>
			        <div className="btn">
				        <a href="#">Submit</a>
			        </div>
		        </div>
	        </div>
        )
    }
}
     

export default (contactUs)