import React, { Component } from 'react'
import '../styles/easypaisa-payment.css'
import '../styles/style.css'
import easypaisa from '../resources/easypaisa.png';
import plane from '../resources/plane2.png'
import axios from 'axios';
import { connect } from 'react-redux'; 
import '../styles/popup-content.css'
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';


class paymentep extends Component{

  constructor(props) {
    super(props);
    console.log(this.props.match.params.id)

    this.state = {
      id: this.props.match.params.id,
      adultTicket: 0,
      childTicket:0,
      departure:'',
      arrival:'',
      startTime:'',
      endTime:'',
      price:0,
      childPrice:0,
      totalAmount:0,
      airline:'',
      flightDate: '',
      stops:'',
      retStartTime:'',
      retEndTime: '',
      retAirline: '',
      retStops:'',
      retFlightDate: '',
      popUpvisible:false

    }
    
    this.buyTicket = this.buyTicket.bind(this);
    this.addAdultTicket = this.addAdultTicket.bind(this);
    this.subAdultTicket = this.subAdultTicket.bind(this);
    this.addChildTicket = this.addChildTicket.bind(this);
    this.subChildTicket = this.subChildTicket.bind(this);

  }
  
  openModal() {
    this.buyTicket("test")
    this.setState({
      popUpvisible : true
    });
}

closeModal() {
    this.setState({
        popUpvisible : false
    });

}

  buyTicket(e) {
    console.log(e)
    console.log("Button clicked")
    console.log(this.props.token["key"])
    
    if (this.props.FlightType == "round") {
      axios.post('http://127.0.0.1:8000/api-reserve/payment/', {
        token: this.props.token['key'],
        id: this.state.id,
        adultTicket: this.state.adultTicket,
        childTicket: this.state.childTicket,
        departure: this.state.departure,
        arrival: this.state.arrival,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        price: this.state.price,
        childPrice: this.state.childPrice,
        airline: this.state.airline,
        flightDate: this.state.flightDate,
        retFlightDate: this.state.retFlightDate,
        retStartTime:this.state.retStartTime,
        retEndTime: this.state.retEndTime,
        retAirline: this.state.retAirline,
        retStops:this.state.retStops,
        stops:this.state.stops,
        type: "round",
        totalAmount: (this.state.price * this.state.adultTicket) + (this.state.childPrice * this.state.childTicket)
      }).then((res) => {
        console.log(res.data);
      }).catch((error) => console.log(error));
    } else {
      axios.post('http://127.0.0.1:8000/api-reserve/payment/', {
        token: this.props.token['key'],
        id: this.state.id,
        adultTicket: this.state.adultTicket,
        childTicket: this.state.childTicket,
        departure: this.state.departure,
        arrival: this.state.arrival,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        price: this.state.price,
        childPrice: this.state.childPrice,
        airline: this.state.airline,
        flightDate: this.state.flightDate,
        stops:this.state.stops,
        type: "1way",
        totalAmount: (this.state.price * this.state.adultTicket) + (this.state.childPrice * this.state.childTicket)
      }).then((res) => {
        console.log(res.data);
      }).catch((error) => console.log(error));
    }
}
addAdultTicket() {
    console.log("Incrementing the adult tickets") 
    this.setState({
        adultTicket:this.state.adultTicket+1,
        totalAmount: (this.state.price*this.state.adultTicket) + (this.state.childPrice*this.state.childTicket)
    }) 
    console.log("the value is now " , this.state.adultTicket)
}
subAdultTicket() {
    console.log("decrementing the adult tickets")
    if (this.state.adultTicket > 0) {
        var tmp=this.state.adultTicket-1
        this.setState({
            adultTicket:tmp,
            totalAmount: (this.state.price*this.state.adultTicket) + (this.state.childPrice*this.state.childTicket)
        })
    }
    console.log("the value is now " , this.state.adultTicket)
}    
addChildTicket() {
    console.log("Incrementing the child tickets")
    this.setState({
        childTicket:this.state.childTicket+1,
        totalAmount: (this.state.price*this.state.adultTicket) + (this.state.childPrice*this.state.childTicket)
    }) 
    console.log("the value is now " , this.state.childTicket)
}
subChildTicket() {
    console.log("decrementing the child tickets")
    if (this.state.childTicket > 0) {
        this.setState({
            childTicket:this.state.childTicket-1,
            totalAmount: (this.state.price*this.state.adultTicket) + (this.state.childPrice*this.state.childTicket)
        })
    }
    console.log("the value is now " , this.state.childTicket)
}
  componentDidMount() {
    
    if (window.location.pathname == '/') {
      this.props.changeHomeScreenStatus(true)  
    } else {
      this.props.changeHomeScreenStatus(false)
    }
    var subString = window.location.pathname
    if (subString.includes("creditcard") || subString.includes("easypaisa")) {
      this.props.changePaymentScreenStatus(true)
    } else {
      this.props.changePaymentScreenStatus(false)
    }

    const res = this.props.ticket.filter(ticket => ticket.id == this.state.id);
    
    console.log("The result is ", res)
    console.log(this.props.FlightType)
    if (this.props.FlightType == "round") {
      console.log("In the round type")
      res.forEach(element => this.setState({
        departure: element.departure,
        arrival: element.arrival,
        startTime: element.startTime,
        endTime: element.endTime,
        price: parseInt(element.price),
        childPrice: parseInt(element.price)*0.8,
        totalAmount: (this.state.price*this.state.adultTicket) + (this.state.childPrice*this.state.childTicket),
        airline: element.airline,
        flightDate: element.date,
        stops: element.stops,
        retFlightDate: element.retDate,
        retStartTime:element.retStartTime,
        retEndTime: element.retEndTime,
        retAirline: element.retAirline,
        retStops:element.retStops,

        
    }));
    } else {
      res.forEach(element =>  this.setState({
        departure: element.departure,
        arrival: element.arrival,
        startTime: element.startTime,
        endTime: element.endTime,
        price: parseInt(element.price),
        childPrice: parseInt(element.price)*0.8,
        totalAmount: (this.state.price*this.state.adultTicket) + (this.state.childPrice*this.state.childTicket),
        airline: element.airline,
        flightDate: element.date,
        stops:element.stops,
                  
        
    }));
      
    }


}
    render() {
        return (
            <div className="wrapper_ep">
                <div className="checkout_wrapper">
    <div className="product_info">
      <img src={plane} alt="product"/>
      <div className="content">
        <h3>{this.state.departure +"To"+  this.state.arrival}</h3>
        <p>Total amount</p>
        <p>{this.state.totalAmount}</p>
      </div>
    </div>
    <div className="price_section">
      <div className="p_section">
        <div className="timing">
          <h3>{"Departure:"+this.state.startTime}</h3>
          <h3>{"Arrival:"+this.state.endTime}</h3>
        </div>
        <div className="tickets_price">
            <div className="tprice">
              <h3>{"Adult Price:"+ this.state.price}</h3>
              <h3>{"Child Price:"+ this.state.childPrice}</h3>
            </div>
        </div>
        <div className="ticket_count">
          <div className="child_ticket">
            <h3>Child</h3>
            <div className="child_count">
              <button onClick={this.subChildTicket}><i className="fa fa-minus" aria-hidden="true"></i>
              </button>
              <p>{this.state.childTicket}</p>
              <button onClick={this.addChildTicket}><i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="adult_ticket">
            <h3>Adult</h3>
            <div className="adult_count">
              <button onClick={this.subAdultTicket}><i className="fa fa-minus" aria-hidden="true"></i>
              </button>
              <p>{this.state.adultTicket}</p>
              <button onClick={this.addAdultTicket}><i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
    <div className="checkout_form">
      <div className="company">
        <img src={easypaisa} alt="" />
      </div>
      <p>EasyPaisa.</p>
      <div className="details">
        <div className="section">
          <input type="text" placeholder="EasyPaisa Account no" />
        </div>
        <div className="section">
          <input type="text" placeholder="Accountholder Name"/>
        </div>
        {              <div className="btn_cc">
                <a onClick={() => this.openModal()}>Pay</a>
                <Modal 
                    visible={this.state.popUpvisible}
                    width="400"
                    height="300"
                    effect="fadeInLeft"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <h1>Thanks for Buying</h1>
                        <p>You will get a confirmation at your provided email.</p>
                        <Link to="/">Close</Link>
                    </div>
                </Modal>
                
              </div>

        }
      </div>
    </div>
  </div>
</div>
        );

    }
}

const mapStateToProps = (state) => {
  return {
      ticket: state.flights,
    token: state.key,
    FlightType:state.FlightType
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
      changePaymentScreenStatus: (status) => {
        dispatch({
          type: "CHANGE_PAYMENTSCREEN_STATUS",
          status: status
        })
  },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(paymentep)