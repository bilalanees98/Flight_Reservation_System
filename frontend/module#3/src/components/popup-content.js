import React from "react";


export default ({ close }) => (
    <div className="modal">
    
        <a href="/" className="close" onClick={close}>
            &times;
        </a>
        <div className="header"><h2> Thank you for buying with us. </h2></div>
        <div className="content">
            <p>Your will shortly receive a confirmation email at provided email.</p>
        </div>
  </div>
);