import React, { Component } from 'react'
import '../styles/style.css'
import '../styles/flightList.css'
import axios from 'axios';
import { connect } from 'react-redux';
import  barcode  from '../resources/barcode.png';
import  plane  from "../resources/plane3.png";
import  planeWhite  from "../resources/plane3-white.png"
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';


class history extends Component{
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            type: '1way',
            noTicket: false,
        showError:false,
        sortByAsc: false,
        sortByDsc: false,
        }
        this.showOneWayTickets = this.showOneWayTickets.bind(this)
        this.showReturnTickets=this.showReturnTickets.bind(this)
        this.sortByAsc = this.sortByAsc.bind(this)
        this.sortByDsc = this.sortByDsc.bind(this)
    }

    sortByAsc(e) {
        console.log(e.target)
        if (this.state.sortByDsc == true) {
            this.setState({
                sortByDsc: false,
                sortByAsc:!this.state.sortByAsc
            })
            
            if (this.state.history.length > 0) {
                console.log("prie",this.state.history[0].price)
                if(typeof (this.state.history[0].price) != "number"){
                    for (var i = 0; i < this.state.history.length; i++) {
                        console.log(this.state.history[i].price)
                        this.state.history[i].price = parseInt(this.state.history[i].price);
                        console.log(this.state.history[i].price)
                    }
                }
                
                console.log(this.state.history)

                this.state.history.sort(function(a, b) {
                    return a.price - b.price;
                });
                console.log(this.state.history)
        }
            
        } else {
            this.setState({
                sortByAsc:!this.state.sortByAsc
            })
            if (this.state.history.length > 0) {
                if(typeof (this.state.history[0].price) != "number"){
                    for (var i = 0; i < this.state.history.length; i++) {
                        console.log(this.state.history[i].price)
                        this.state.history[i].price = parseInt(this.state.history[i].price);
                        console.log(this.state.history[i].price)
                    }
                }
                console.log(this.state.history)
            this.state.history.sort(function(a, b) {
                    return a.price - b.price;
                });
                console.log(this.state.history)
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
            if (this.state.history.length > 0) {
                if(typeof (this.state.history[0].price) != "number"){
                    for (var i = 0; i < this.state.history.length; i++) {
                        console.log(this.state.history[i].price)
                        this.state.history[i].price = parseInt(this.state.history[i].price);
                        console.log(this.state.history[i].price)
                    }
                }
        console.log(this.state.history)
            this.state.history.sort(function(a, b) {
                    return b.price - a.price;
                });
                console.log(this.state.history)
        }
        } else { 
        this.setState({
            sortByDsc: !this.state.sortByDsc
        })
        if (this.state.history.length > 0) {
            if(typeof (this.state.history[0].price) != "number"){
                for (var i = 0; i < this.state.history.length; i++) {
                    console.log(this.state.history[i].price)
                    this.state.history[i].price = parseInt(this.state.history[i].price);
                    console.log(this.state.history[i].price)
                }
            }
        this.state.history.sort(function(a, b) {
                return b.price - a.price;
            });
    }
    }
    }

    
 
    dropTickets(status, id) {
    console.log("Dropping the tickets")
    if (status == true) {
        var filtered = this.state.history.filter(function (el) { return el.id != id; }); 
      this.setState({
        history:filtered
      })
        
    }
    }
    
    showOneWayTickets() {
        console.log("Showing 1 way flights in a minute")
        this.state.type = '1way'
        trackPromise(
            axios.get('http://127.0.0.1:8000/api-reserve/list/', {
                params:{
                    token: this.props.token['key']
                }
            }).then((res) => {
                console.log(res.data);
                // this.props.storeUserToken(parseInt(res.data));
                this.setState({
                    history: res.data,  
                })
                this.saveFlightsHistory(this.state.history)
                
                if (this.state.history.length == 0) {
                    this.setState({
                        noTicket:true
                    })
                }

              })
                .catch((error) => {
                    console.log(error)
                    this.setState({
                        showError:true

                    })
                }) 
            )
    }
    showReturnTickets() {
        console.log("Showing return flights in a minute")
        this.state.type = 'round'
        trackPromise(
            axios.get('http://127.0.0.1:8000/api-reserve/return-list/', {
                params:{
                    token: this.props.token['key']
                }
            }).then((res) => {
                console.log(res.data);
                // this.props.storeUserToken(parseInt(res.data));
                this.setState({
                    history:res.data
                })
                this.saveFlightsHistory(this.state.history)
                if (this.state.history.length == 0) {
                    this.setState({
                        noTicket:true
                    })
                }

              })
                .catch((error) => {
                    console.log(error)
                    this.setState({
                        showError:true

                    })
                }) 
            )
    }


    componentDidMount() {
        
    if (window.location.pathname == '/') {
        this.props.changeHomeScreenStatus(true)  
      } else {
        this.props.changeHomeScreenStatus(false)
      }
        console.log("The history page is demanded")
        this.showOneWayTickets()
    }

    render() {
    const { history } = this.state;
    const historyList = history.length ? (
    history.map(history => {
        return (
            <div className="wrapper-ticket" key={history.id} >
                <div className="ticket-details">
                    <div className="first-section">
                        <p>From</p>
                        <h2>{history.departure}</h2> 
                        <p>{history.date}</p>
                        <p>{history.startTime}</p>
                        {this.state.type=="round" ? (
                                <div>
                                    <p>From</p>
                                    <h2>{history.arrival}</h2>
                                    <p>{history.retDate}</p>
                                    <p>{history.retStartTime}</p>
                                </div>
                            ): (<br/>     
                            )}
                    </div>
                    <div className="second-section">
                        <img src={plane} alt="" />
                    </div>
                    <div className="third-section">
                        <p>To</p>
                        <h2>{history.arrival}</h2>
                        <p>{history.date}</p>
                        <p>{history.endTime}</p>
                        {this.state.type=="round" ? (
                                <div>
                                    <p>To</p>
                                    <h2>{history.departure}</h2>
                                    <p>{history.retDate}</p>
                                    <p>{history.retEndTime}</p>
                                </div>
                            ): (<br/>     
                            )}
                    </div>
                    <div className="airline-section">
                            <p>{history.airline}</p>
                            {this.state.type=="round" ? (
                                <div>
                                    <p>{history.retAirline}</p>
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
                        <h4>{history.airline}</h4>
                        {
                                this.state.type == "round" ? (
                                    <div>
                                        <h4>{history.retAirline}</h4>
                                    </div>
                                ): (
                                    <br/>   
                                )
                        }  
                        <p>{"Price: " + history.price}</p>
                        
                        
                        <div className="drop">
                            
                            {<Link to={"drop" + history.id + "-" + this.state.type}>Drop</Link>}
                
                </div>
        

                    </div>
                </div>
                </div>
            )
        })
    )
        : (
            <div className = "center">
               {
                        this.state.noTicket ?(<p> No tickets history available!!</p>):(<br/>)
                    }{
                        this.state.showError ?(<p>Could not reach the server!! Please try again.</p>):(<br/>)
                    }
                <div className="foothelper"></div>
            </div>
    )
    return (
        <div>
        <div className="wrapper1">
            <h1>Flight History</h1>
            <div className="button">
                {<Link onClick={this.showOneWayTickets}>Show 1 way flights</Link>}
                {<Link onClick={this.showReturnTickets}>Show Return flights</Link>}
            </div>
            {historyList}
        </div>
        <div className="sorting-drop">

<Button disableElevation variant="outlined" color="primary">
        View Flights By:
</Button>
<div className="drop-check1">
        Sort by price Ascending:<Checkbox
        checked={this.state.sortByAsc}
        onChange={this.sortByAsc}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
        <div className="drop-check2">            
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
        token:state.key,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        changeHomeScreenStatus: (status) => {
            dispatch({
              type: "CHANGE_HOMESCREEN_STATUS",
              status: status
            })
        },
        saveFlightsHistory: (flights) => {
            dispatch({
              type: "SAVE_DROP_INFO",
              flights: flights
            })
        },
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(history)