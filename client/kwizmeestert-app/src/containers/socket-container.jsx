import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSocketInitialize } from '../actions/on-socket';

const RegisterClient = require('../../../../utilities/DAL/communication-protocol/registerClient');
const io = require('socket.io-client');

class SocketContainer extends Component {
    constructor(props) {
        super(props);

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
