import React, { Component } from 'react'

import '../styles/footer.css'

class footer extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
      return (
          <footer>
              <div className="footer-fsection"> 
	<div className="Brand-name">
		<img src={require("../resources/logo.svg")}/>
		<p> FlightDelight is the premium goto service for fulfiling your travel needs</p>
	</div>
	<div className="Links">
		<h3>Links</h3>
		<div className="web-links">
			<p>-Twitter: flightdelight515</p>
			<p>-Facebook: flightdelight515</p>
		</div>
	</div>
	
	<div className="Location">
		<h3>Location</h3>
		<p>FAST NUCES H-11/4, Islamabad </p>
	</div>
    </div>
    <div className="footer-Ssection">
	<hr/>
	<p className="copyright">© 2019. All Rights Reserved.</p>
</div>
          </footer>
        );

    }
}


export default footer