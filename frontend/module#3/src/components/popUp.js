import React, { Component } from 'react'
import Popup from "reactjs-popup";
import '../styles/popup-content.css'
import Content from './popup-content'
class popup extends Component{

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.buttonClicked = this.buttonClicked.bind(this);
    }
    buttonClicked(event) {
        console.log("Hello")    
    }
    render() {
        return (
            <Popup modal trigger={<button onClick={this.hello}>Click me</button>} >
                <Content />
            </Popup>
        );
    }
}


export default popup
