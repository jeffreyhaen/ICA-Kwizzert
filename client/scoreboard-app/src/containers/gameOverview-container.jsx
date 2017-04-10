import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { onGameReceiveList, onGameDetailsReceived } from '../actions/on-game';

const { RequestGameList, ResponseGameList, RegisterToGame } = require('../../../../utilities/DAL/communication-protocol/');

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

    onGameChoose(gameId) {
        this.props.onGameDetailsReceived(this.props.gameList.find((game) => {
            return game.name === gameId
        }));

        let registerToGame = new RegisterToGame(gameId);
        this.props.socket.emit(registerToGame.type, registerToGame);

        this.context.router.push('/scoreboard');
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Registreer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.gameList.map((game, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{game.name}</td>
                                        <td><input type="button" className="btn btn-primary" value="Kies" onClick={() => {
                                            this.onGameChoose(game.name);
                                        }} /></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onGameReceiveList: onGameReceiveList,
            onGameDetailsReceived: onGameDetailsReceived,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        gameList: state.gameStore.gameList,
    };
}

GameOverviewContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(GameOverviewContainer);
