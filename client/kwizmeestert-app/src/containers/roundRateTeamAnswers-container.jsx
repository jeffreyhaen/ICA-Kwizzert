import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onRoundInformationReceived } from '../actions/on-round';
import Switch from 'react-bootstrap-switch';

const { RequestRoundInformation, ResponseRoundInformation, RateTeamAnswer } = require('../../../../utilities/DAL/communication-protocol/');

class RoundRateTeamAnswers extends Component {
    constructor(props) {
        super(props);
        this.reloadAnswers();
    }

    reloadAnswers() {
        let requestRoundInformation = new RequestRoundInformation(this.props.game.name, this.props.round.number);

        this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {
            console.log(responseRoundInformation)
            this.props.onRoundInformationReceived(responseRoundInformation.round);
        });

        this.props.socket.emit(requestRoundInformation.type, requestRoundInformation);
    }

    componentWillUnmount() {
        this.props.socket.off(new ResponseRoundInformation().type);
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Antwoord</th>
                            <th>Goedkeuring</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.answers.map((team, index) => {
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
            onRoundInformationReceived: onRoundInformationReceived,
        }, dispatch);
}

function mapStateToProps(state, props) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
        
        round: state.roundStore.round,
        answers: state.roundStore.round.currentQuestion === null ? [] : state.roundStore.round.currentQuestion.teamAnswers,
    };
}

RoundRateTeamAnswers.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(RoundRateTeamAnswers);
