import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGameDetailsReceived } from '../actions/on-game';
import Switch from 'react-bootstrap-switch';

const { RequestGameInformation, ResponseGameInformation, StartGame, StopGame, RateTeamRegistration, RegisterToGame } = require('../../../../utilities/DAL/communication-protocol/');

class GameDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.registerToServer();
        this.reloadGame();
    }

    registerToServer() {
        let registerToGame = new RegisterToGame(this.props.gameId);
        this.props.socket.emit(registerToGame.type, registerToGame);
    }

    reloadGame() {
        let requestGameInformation = new RequestGameInformation(this.props.gameId);

        this.props.socket.on(new ResponseGameInformation().type, (responseGameInformation) => {
            this.props.onGameDetailsReceived(responseGameInformation.game);
        });

        this.props.socket.emit(requestGameInformation.type, requestGameInformation);
    }

    componentWillUnmount() {
        this.props.socket.off(new ResponseGameInformation().type);
    }

    onTeamRateRegistration(gameId, teamId, state) {
        let rateTeamRegistration = new RateTeamRegistration(gameId, teamId, state);

        this.props.socket.emit(rateTeamRegistration.type, rateTeamRegistration);
        
        this.reloadGame();
    }

    onGameStart(event) {
        event.preventDefault();

        let startGame = new StartGame(this.props.gameId);
        this.props.socket.emit(startGame.type, startGame);

        this.context.router.push('/chooseCategories');
    }
    
    onGameStop(event) {
        event.preventDefault();

        let stopGame = new StopGame(this.props.gameId);
        this.props.socket.emit(stopGame.type, stopGame);

        this.reloadGame();
    }

    render() {
        return (
            <div className="container">
                <div className="pull-right">
                    <input type="button" className="btn btn-primary" value="Start" disabled={this.props.game.started} onClick={(e) => {
                        this.onGameStart(e);
                    }} />
                    {" "}
                    <input type="button" className="btn btn-primary" value="Stop" disabled={!this.props.game.started} onClick={(e) => {
                        this.onGameStop(e);
                    }} />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Team naam</th>
                            <th>Goedkeuring</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.game.teams.map((team, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{team.name}</td>
                                        <td><Switch onText="Ja" offText="Nee" id={team.name} defaultValue={ team.accepted===true } 
                                        onChange={(element, state) => {
                                            this.onTeamRateRegistration(this.props.gameId, team.name, state);
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
            onGameDetailsReceived: onGameDetailsReceived,
        }, dispatch);
}

function mapStateToProps(state, props) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,

        gameId: props.params.gameId,
    };
}

GameDetailContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(GameDetailContainer);
