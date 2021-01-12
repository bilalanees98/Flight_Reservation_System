const initState = {
    key:'',
    isUserLogin: false,
    destination: '',
    arrival: '',
    date: '',
    returnDate: '',
    FlightType:'',
    flights: [],
    isHomeScreen: true,
    //new
    flightHistory: [],
    isPaymentPage:false,
    
    
}
const rootReducer = (state = initState, action) => {
    if (action.type === 'LOGIN_IN') {
        console.log("Login")
        return {
            ...state, 
            isUserLogin: true
        }
    }
    if (action.type === 'SIGN_OUT') {
        console.log("Sign out")
        return {
            ...state, 
            isUserLogin: false
        }
    }
    if (action.type === 'STORE_FLIGHT_INFO') {
        console.log("STORE_FLIGHT_INFO is called") 
        console.log("The flight type is",action.FlightType)
        return {
            ...state, 
            destination:action.destination,
            arrival:action.arrival,
            date: action.date,
            FlightType: action.FlightType,
            returnDate: action.returnDate,  
        }
    }
    if (action.type === 'STORE_FLIGHTS') {
        console.log("The store flight action is called")
        console.log(action.tickets)
        return {
            ...state,
            flights:action.tickets,
        }
    }
    if (action.type === "STORE_TOKEN") {
        console.log("The token is storing in the store")
        console.log(action.key)
        return {
            ...state,
            key:action.key,
        }
    }
    if (action.type === "CHANGE_HOMESCREEN_STATUS") {
        console.log("Changing Home screen status")
        console.log(action.status)
        return {
            ...state,
            isHomeScreen:action.status,
        }
    }
    if (action.type === "CHANGE_PAYMENTSCREEN_STATUS") {
        console.log("Changing PAYMENT screen status")
        console.log(action.status)
        return {
            ...state,
            isPaymentPage:action.status,
        }
    }
    if (action.type === "SAVE_DROP_INFO") {
        console.log("Saving drop ticket information")
        console.log(action.flights)
       
        return {
            ...state,
            flightHistory:action.flights
            
        }
    }

    return state;
}

export default rootReducer;