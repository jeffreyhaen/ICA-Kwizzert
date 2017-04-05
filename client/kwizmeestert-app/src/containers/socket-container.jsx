import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSocketInitialize } from '../actions/on-socket';

const { RegisterClient } = require('../../../../utilities/DAL/communication-protocol/');
const io = require('socket.io-client');

class SocketContainer extends Component {
    constructor(props) {
        super(props);

        let socket = io('http://localhost:3001/');
        let registerClient = new RegisterClient("kwizmeestert");

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
        socket: state.socketStore.socket,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(SocketContainer);
