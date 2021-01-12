import React, { Component } from 'react'
import '../styles/style.css'
import '../styles/flightList.css'
import axios from 'axios';
import { connect } from 'react-redux';
import  barcode  from '../resources/barcode.png';
import  plane  from "../resources/plane3.png";
import  planeWhite  from "../resources/plane3-white.png"
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import { trackPromise } from 'react-promise-tracker';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

class flightList extends Component{
    constructor(props) {
        super(props);
        this.sortByAsc = this.sortByAsc.bind(this)
        this.sortByDsc = this.sortByDsc.bind(this)
    }
    state = {
        depart: this.props.departure,
        arrival: this.props.arrival,
        date:this.props.date,
        returnDate: this.props.returnDate,
        type:this.props.type,
        tickets: [],
        isLogin: false,
        noTicket: false,
        showError: false,
        sortByAsc: false,
        sortByDsc: false,
    }
    sortByAsc(e) {
        console.log(e.target)
        if (this.state.sortByDsc == true) {
            this.setState({
                sortByDsc: false,
                sortByAsc:!this.state.sortByAsc
            })
            
            if (this.state.tickets.length > 0) {
                if(typeof (this.state.tickets[0].price) != "number"){
                    for (var i = 0; i < this.state.tickets.length; i++) {
                        console.log(this.state.tickets[i].price)
                        this.state.tickets[i].price = parseInt(this.state.tickets[i].price.slice(2));
                        console.log(this.state.tickets[i].price)
                    }
                }
                
                console.log(this.state.tickets)
            this.state.tickets.sort(function(a, b) {
                    return a.price - b.price;
                });
                console.log(this.state.tickets)
        }
            
        } else {
            this.setState({
                sortByAsc:!this.state.sortByAsc
            })
            if (this.state.tickets.length > 0) {
                if(typeof (this.state.tickets[0].price) != "number"){
                    for (var i = 0; i < this.state.tickets.length; i++) {
                        console.log(this.state.tickets[i].price)
                        this.state.tickets[i].price = parseInt(this.state.tickets[i].price.slice(2));
                        console.log(this.state.tickets[i].price)
                    }
                }
                console.log(this.state.tickets)
            this.state.tickets.sort(function(a, b) {
                    return a.price - b.price;
                });
                console.log(this.state.tickets)
        }

        }

    }
    sortByDsc(e) {
        console.log(e.target)
        if (this.state.sortByAsc == true) {
            this.setState({
                sortByAsc: false,
                sortByDsc: !this.state.sortByDsc
            })
            if (this.state.tickets.length > 0) {
                if(typeof (this.state.tickets[0].price) != "number"){
                    for (var i = 0; i < this.state.tickets.length; i++) {
                        console.log(this.state.tickets[i].price)
                        this.state.tickets[i].price = parseInt(this.state.tickets[i].price.slice(2));
                        console.log(this.state.tickets[i].price)
                    }
                }
        console.log(this.state.tickets)
            this.state.tickets.sort(function(a, b) {
                    return b.price - a.price;
                });
                console.log(this.state.tickets)
        }
        } else { 
        this.setState({
            sortByDsc: !this.state.sortByDsc
        })
        if (this.state.tickets.length > 0) {
            if(typeof (this.state.tickets[0].price) != "number"){
                for (var i = 0; i < this.state.tickets.length; i++) {
                    console.log(this.state.tickets[i].price)
                    this.state.tickets[i].price = parseInt(this.state.tickets[i].price.slice(2));
                    console.log(this.state.tickets[i].price)
                }
            }
        this.state.tickets.sort(function(a, b) {
                return b.price - a.price;
            });
    }
    }
    }
    componentDidMount() {
        var subString = window.location.pathname
        if (subString.includes("creditcard") || subString.includes("easypaisa")) {
          this.props.changePaymentScreenStatus(true)
        } else {
          this.props.changePaymentScreenStatus(false)
        }
        console.log("Debugging")
        this.props.storeFlightInfo(this.state.depart, this.state.arrival, this.state.date, this.state.returnDate, this.state.type)
        console.log("Debugging")
        ////temporary change 
        if (this.props.token != "") {
            this.setState({
                isLogin: true
            })
        }
        if (window.location.pathname == '/') {
            this.props.changeHomeScreenStatus(true)
        } else {
            this.props.changeHomeScreenStatus(false)
        }
        console.log("The type of the flight is", this.state.type)
        if (this.state.type == "round") {
            trackPromise(
                axios.get("http://127.0.0.1:8000/api-flight/return-list/", {
                    params: {
                        token: this.props.token['key'],
                        departure: this.props.departure,
                        arrival: this.props.arrival,
                        date: this.props.date,
                        type: this.props.type,
                        returnDate: this.props.returnDate
                    }
                }).then(res => {
                    this.setState({
                        tickets: res.data
                    })
                    for (var i = 0; i < this.state.tickets.length; i++) {
                        console.log(this.state.tickets[i].price)
                        this.state.tickets[i].price = parseInt(this.state.tickets[i].price.slice(2));
                        console.log(this.state.tickets[i].price)
                    }                   
                    if (this.state.tickets.length == 0) {
                        this.setState({
                            noTicket:true
                        })
                    }
                    this.props.storeTickets(this.state.tickets)
                }).catch((error) => {
                    console.log("erorororor hehre")
                    this.setState({
                        showError:true
                    })
                })
            )
        } else {
            trackPromise(
                axios.get("http://127.0.0.1:8000/api-flight/list/", {
                    params: {
                        token: this.props.token['key'],
                        departure: this.props.departure,
                        arrival: this.props.arrival,
                        date: this.props.date
                    }
                })
                    .then(res => {
                        this.setState({
                            tickets: res.data
                        })
                        for (var i = 0; i < this.state.tickets.length; i++) {
                            console.log(this.state.tickets[i].price)
                            this.state.tickets[i].price = parseInt(this.state.tickets[i].price.slice(2));
                            console.log(this.state.tickets[i].price)
                        }
                        if (this.state.tickets.length == 0) {
                            this.setState({
                                noTicket:true
                            })
                        }
                        this.props.storeTickets(this.state.tickets)
                    }).catch((error) => {
                        console.log("erorororor hehre")
                        this.setState({
                            showError:true

                        })
                    })
            )
        }
    }

    render() {
        const{ isLogin }=this.state
        const { tickets } = this.state;
        console.log("the key is ", this.props.token)
        const ticketsList = tickets.length ? (
        tickets.map(tickets => {
            return (
                <div className="wrapper-ticket" key={tickets.id}>
                <div className="ticket-details">
                    <div className="first-section">
                        <p>From</p>
                        <h2>{tickets.departure}</h2> 
                        <p>{tickets.date}</p>
                            <p>{tickets.startTime}</p>
                            {this.state.type=="round" ? (
                                <div>
                                    <p>From</p>
                                    <h2>{tickets.arrival}</h2>
                                    <p>{tickets.retDate}</p>
                                    <p>{tickets.retStartTime}</p>
                                </div>
                            ): (<br/>     
                            )}
                    </div>
                    <div className="second-section">
                        <img className="photo" src={plane} alt="" />
                    </div>
                    <div className="third-section">
                        <p>To</p>
                        <h2>{tickets.arrival}</h2>
                            <p>{tickets.date}</p>
                            <p>{tickets.endTime}</p>
                            {this.state.type=="round" ? (
                                <div>
                                    <p>To</p>
                                    <h2>{tickets.departure}</h2>
                                    <p>{tickets.retDate}</p>
                                    <p>{tickets.retEndTime}</p>
                                </div>
                            ): (<br/>     
                            )}
                        </div>
                        <div className="airline-section">
                            <p>{tickets.airline}</p>
                            {this.state.type=="round" ? (
                                <div>
                                    <p>{tickets.retAirline}</p>
                                </div>
                            ): (<br/>     
                            )}
                        </div>        
                    <div className="fifth-section">
                        <img src={barcode} alt="" />
                    </div>

                    </div>
                <div className="ticket-price">
                    <div className="sixth-section">
                        <img src={planeWhite} alt=""/>
                        
                           
                        <p>{"Price:" + tickets.price}</p>

                            {isLogin ? (<div>
                                <h5>Purchasing Options:</h5>
                                <Link to={"creditcard" + tickets.id}>CreditCard</Link>
                                <Link to={"easypaisa" + tickets.id}>Easypaisa</Link>
                                </div>)
                                :
                                (<br/>)
                            }
                             
                            
                    </div>
                </div>
                </div>
            )
        })
        )
            : (
                <div className="center">
                    {
                        this.state.noTicket ?(<p> No tickets available!!</p>):(<br/>)
                    }{
                        this.state.showError ?(<p>Could not reach the server!! Please try again.</p>):(<br/>)
                    }
                   
                    <div className="foothelper"></div>
                </div>
        )
        return (
            <div>
            <div className="wrapper1">
                <h1>{this.state.depart + " To " + this.state.arrival}</h1>
                {isLogin ? (<br />) : (<h5>***Tickets can only be bought if you are logged in***</h5>)}
                {ticketsList}
            </div>
            
                <div className="sorting-options">

                <Button disableElevation variant="outlined" color="primary">
                        View Flights By:
      </Button>
      <div className="check1">
      Sort by price Ascending:<Checkbox
        checked={this.state.sortByAsc}
        onChange={this.sortByAsc}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>
        <div className="check2">            
        Sort by price Descending:<Checkbox
        checked={this.state.sortByDsc}
        onChange={this.sortByDsc}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
       </div>         
                </div>    
            </div>
        );

    }
}


    
const mapStateToProps = (state) => {
    return {
        token: state.key,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storeTickets: (tickets) => {
            dispatch({
                type: "STORE_FLIGHTS",
                tickets :tickets
            })
        },
        changeHomeScreenStatus: (status) => {
            dispatch({
              type: "CHANGE_HOMESCREEN_STATUS",
              status: status
            })
        },
        changePaymentScreenStatus: (status) => {
            dispatch({
              type: "CHANGE_PAYMENTSCREEN_STATUS",
              status: status
            })
      },
          
        storeFlightInfo: (destination, arrival, date, returnDate, flighttype) => {
            dispatch({
                type: "STORE_FLIGHT_INFO",
                destination:destination,
                arrival:arrival,
                date:date,
                FlightType:flighttype,
                returnDate:returnDate,
            })
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(flightList)