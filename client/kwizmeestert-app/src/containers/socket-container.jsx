import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSocketInitialize } from '../actions/on-socket';
var RegisterClient =  require('../../../../utilities/DAL/communication-protocol/registerClient');

var {} = require('../../../../utilities/DAL/communication-protocol/');

const io = require('socket.io-client');
//require('../../../../utilities/DAL/communication-protocol/');

class SocketContainer extends Component {
    constructor(props) {
        super(props);

        console.log(new RegisterClient("test"));
        var socket = io('http://localhost:3001/');
        var registerClient = new RegisterClient("kwizmeestert");

        socket.emit(registerClient.type, registerClient);

        this.props.onSocketInitialize(socket);
    }

    render() {
        return (
            <div></div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onSocketInitialize: onSocketInitialize,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(SocketContainer);
