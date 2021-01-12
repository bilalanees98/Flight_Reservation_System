import React, { Component } from 'react'
import '../styles/top-deals.css'
import axios from 'axios';

class topDestinations extends Component{

    constructor(props) {
        super(props);
    }
    state = {
        tickets: [1,2,3,4,5,6],
        count:6
    }
    componentDidMount() {
        console.log("Waiting to get tickets deatisl")
        axios.get("http://127.0.0.1:8000/api-flight/top/")
            .then(res => {
                this.setState({
                    tickets:res.data
                })
                console.log(res.data)
            })
    }


    render() {
        const { tickets } = this.state;
        const ticketsList = tickets.length ? (
            tickets.map(tickets => {
                return (
                    
                        <div className="my-2 mx-auto bg-white shadow-1 blue-hover ticket-size">
                            <img src="data:image/jpeg;base64,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" alt="Man with backpack"
                                className="d-block w-full" />
                            <div className="px-1 py-1">
                                <p className="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
                                {tickets.departure + " to " + tickets.arrival}
                    </p>
                                <p className="ff-serif font-weight-normal text-black card-heading mt-0 mb-1">
                                   { "Price: " + tickets.price}
                    </p>
                                <p className="mb-1">
                                    {tickets.date}
                    </p>
                            </div>
                            <a href="#0" className="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link">
                                Buy Ticket
                </a>
                        </div>
                    
                )
            })
        ) : (
                <h2>No tickets available</h2>
                )
        console.log("Hello the top destination section")
        return (
            <div className="top-deals">
                <div class="destination-section">
                    <div className="heading">
                        <h1>Top Deals </h1>
                    </div>
                    <div className="tickets">
                        {ticketsList}
                    </div>
                </div>
            </div>
        );
    }
}

export default (topDestinations)