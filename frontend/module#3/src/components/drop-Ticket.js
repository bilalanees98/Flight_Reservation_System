import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import '../styles/drop.css'
class Drop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            type:'',
            visible : false,
            
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
        axios.post('http://127.0.0.1:8000/api-reserve/drop/', {
            token: this.props.token['key'],
            flightid:  this.state.id,
            type:this.state.type
        }).then((res) => {
            console.log(res.data);
            // this.props.storeUserToken(parseInt(res.data));
            this.setState({
                history: res.data,
                
            })
          })
        .catch((error) => console.log(error)) 
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
    componentDidMount() {
        console.log("hello g")
        console.log(this.props.match.params.id)
        var tmp = this.props.match.params.id.split("-")
        console.log("The tmp is ", tmp)
        this.setState({
            id: tmp[0],
            type:tmp[1],
        })
        const res = this.props.flightHistory.filter(ticket => ticket.id == this.state.id);
        this.setState({
            ticket:res
        })
        console.log("printing ticket",this.state.ticket)
    }

    render() {
        return (

            <section className="">
                <div className="drop_section">
               <div className="drop-content">
                <h1>Drop Ticket</h1>
                <p className="buttonhelper">Are you sure you want to drop this ticket?</p>
                <div className="foot-helper"></div>
                <Button onClick={() => this.openModal()} disableElevation variant="outlined" color="primary">
                        Drop
      </Button>
               
                </div>
                <Modal 
                    visible={this.state.visible}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <h1>Ticket drop</h1>
                        <p>Confirmation mail has been send to your email.</p>
                        <Link to="/" onClick={() => this.closeModal()}>Close</Link>
                    </div>
                    </Modal>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flightHistory: state.flightHistory,
        token:state.key
    }
  }
  

export default connect(mapStateToProps)(Drop)