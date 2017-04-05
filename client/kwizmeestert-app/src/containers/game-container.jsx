import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGameReceiveList } from '../actions/on-game';

const { RequestGameList, ResponseGameList, CreateGame } = require('../../../../utilities/DAL/communication-protocol/');

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.reloadGameList();
    }

    reloadGameList() {
        let requestGameList = new RequestGameList();

        this.props.socket.on(new ResponseGameList().type, (responseGameList) => {
            this.props.onGameReceiveList(responseGameList.gameIds);
            this.props.socket.off(responseGameList.type);
        });

        this.props.socket.emit(requestGameList.type, requestGameList);
    }

    sendNewGame(event) {
        event.preventDefault();

        let createGame = new CreateGame(event.target.txtName.value);
        
        this.props.socket.emit(createGame.type, createGame);

        this.reloadGameList();
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Password</th>
                            <th>GoTo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.gameList.map((gameId, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{gameId}</td>
                                        <td>LinkToGame</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                <br />
                <p>Add new game:</p>
                <form name="newGame" onSubmit={(e) => { 
                    this.sendNewGame(e);
                    }}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="txtName" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Add" />
                </form>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onGameReceiveList: onGameReceiveList,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        gameList: state.gameStore.gameList,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(GameContainer);
