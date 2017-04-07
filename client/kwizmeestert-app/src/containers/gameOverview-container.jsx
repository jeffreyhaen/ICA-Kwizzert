import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { onGameReceiveList } from '../actions/on-game';
import GameDetailContainer from './gameDetail-container';

const { RequestGameList, ResponseGameList, CreateGame } = require('../../../../utilities/DAL/communication-protocol/');

class GameOverviewContainer extends Component {
    constructor(props) {
        super(props);
        this.reloadGameList();
    }

    reloadGameList() {
        let requestGameList = new RequestGameList();

        this.props.socket.on(new ResponseGameList().type, (responseGameList) => {
            this.props.onGameReceiveList(responseGameList.games);
            this.props.socket.off(responseGameList.type);
        });

        this.props.socket.emit(requestGameList.type, requestGameList);
    }

    onNewGame(event) {
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
                            <th>Game</th>
                            <th>Password</th>
                            <th>GoTo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.gameList.map((game, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{game.name}</td>
                                        <td>{game.name}</td>
                                        <td><Link to={`/game/${game.name}`}>Detail</Link></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                <br />
                <p>Add new game:</p>
                <form name="newGame" onSubmit={(e) => { 
                    this.onNewGame(e);
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

export default connect(mapStateToProps, matchDispatchToProps)(GameOverviewContainer);
