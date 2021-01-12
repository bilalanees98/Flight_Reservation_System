import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import Navbar from './navbar'
import Search from './search-section'
import Login from './login'
import SignUp from './signup'
import History from './tickets-history'
import Creditcard from './paymentCC'
import Easypaisa from './paymentEP'
import FlightList from './flightList'
import Top from './topDestinations'
import Contact from './contactus'
import Footer from './footer'
import Drop from './drop-Ticket'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="TailSpin" color="#13296e" height="100" width="100" />
    </div>
          
  );
}

class App extends Component{
  constructor(props) {
    super(props)
    this.setArrival = this.setArrival.bind(this);
    this.setDeparture = this.setDeparture.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setReturnDate = this.setReturnDate.bind(this);
    this.setType = this.setType.bind(this);
  }
  state={
    arrival: '',
    departure: '',
    date: '',
    returnDate:'',
    type:''
  }
  setArrival(e) {
    console.log("in the app.js" , e)
    this.setState({
      arrival: e,
    })
  }
  setDeparture(e) {
    console.log("in the app.js" , e)
    this.setState({
      departure: e,
    })
  }
  setDate(e) {
    this.setState({
      date: e,
    })
    console.log(e)
  }
  setReturnDate(e) {
    this.setState({
      returnDate: e,
    })
    console.log(e)
  }

  setType(e) {
    this.setState({
      type: e,
    })
    console.log(e)
  }

  isHomePage() {
    console.log("The function of the home page is being used")
    this.setState({
      isHomeScreen: !this.isHomeScreen
    })
  }
  componentDidMount() {
    console.log(window.location.pathname);
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
  }

  render(){
    return (
      <BrowserRouter>   
      <div className="App">
        <Navbar />
         
          <Switch>
            {/* render={(props) => <DetailsPage globalStore={globalStore} {...props} /> } */}
            <Route exact path='/'
              render={
                (props) =>
                  <Search
                    arrival={this.state.arrival}
                    departure={this.state.departure}
                    date={this.state.date}
                    type={this.state.type}
                    returnDate={this.state.returnDate}
                    changeArrival={this.setArrival}
                    changeDeparture={this.setDeparture}
                    changeDate={this.setDate}
                    changeReturnDate={this.setReturnDate}
                    changeType={this.setType}
                  />
              } />
            
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route path="/history" component={History} />
            <Route
              path="/flightList"
              render={
                (props) => 
                  <FlightList
                  arrival={this.state.arrival}
                  departure={this.state.departure}
                  date={this.state.date}
                  returnDate={this.state.returnDate}
                  type={this.state.type}  
                  />
              }
              //component={FlightList}
            />
            <Route path="/creditcard:id" component={Creditcard}/>
            <Route path="/easypaisa:id" component={Easypaisa} />
            <Route path="/drop:id" component={Drop} />
          </Switch>
          {
            this.props.HomeScreen ? <Top /> : null
          }
          {
            this.props.HomeScreen ? <Contact/> :null
          }
          {<LoadingIndicator />}
          {
            this.props.PaymentScreen ? null : <Footer />
          }
          
        </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    HomeScreen: state.isHomeScreen,
    PaymentScreen: state.isPaymentPage
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

export default connect(mapStateToProps,mapDispatchToProps)(App);