import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onRoundInformationReceived } from '../actions/on-round';
import Switch from 'react-bootstrap-switch';

const { RequestRoundInformation, ResponseRoundInformation, RateTeamAnswer, StopQuestion, CloseQuestion } = require('../../../../utilities/DAL/communication-protocol/');

class RoundRateTeamAnswers extends Component {
    constructor(props) {
        super(props);
        this.reloadAnswers();
    }

    reloadAnswers() {
        let requestRoundInformation = new RequestRoundInformation(this.props.game.name, this.props.round.number);

        this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {
            this.props.onRoundInformationReceived(responseRoundInformation.round);
        });

        this.props.socket.emit(requestRoundInformation.type, requestRoundInformation);
    }

    componentWillUnmount() {
        this.props.socket.off(new ResponseRoundInformation().type);
    }

    onCloseQuestion() {
        let closeQuestion = new CloseQuestion(this.props.game.name, this.props.round.number);

        this.props.socket.emit(closeQuestion.type, closeQuestion);
    }

    onStopQuestion() {
        let stopQuestion = new StopQuestion(this.props.game.name, this.props.round.number);

        this.props.socket.emit(stopQuestion.type, stopQuestion);

        this.context.router.push('/chooseQuestion');
    }

    onTeamRateAnswer(teamId, questionId, state) {
        let rateTeamAnswer = new RateTeamAnswer(this.props.game.name, this.props.round.number, teamId, questionId, state);

        this.props.socket.emit(rateTeamAnswer.type, rateTeamAnswer);
        
        this.reloadAnswers();
    }

    render() {
        return (
            <div className="container">
                <h2>Ronde: {this.props.round.number} / Vraag: {this.props.answeredQuestions.length+1}</h2>
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
                            this.props.answers.map((answer, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{answer.team.name}</td>
                                        <td>{answer.value}</td>
                                        <td><Switch onText="Ja" offText="Nee" id={answer.team.name} defaultValue={ answer.accepted===true } 
                                        onChange={(element, state) => {
                                            this.onTeamRateAnswer(answer.team.name, answer.question.value, state);
                                        }} /></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                <div className="pull-right">
                    <input type="button" className="btn btn-primary" value="Vraag sluiten"
                    disabled={ !this.props.round.currentQuestion || !this.props.round.currentQuestion.open }
                    onClick={ () => {
                            this.onCloseQuestion();
                    }} />
                    <input type="button" className="btn btn-primary" value="Volgende vraag"
                    disabled={ !this.props.round.currentQuestion || (this.props.round.currentQuestion.open && this.props.answers.filter((answer) => answer.accepted === undefined).length === 0) }
                    onClick={ () => {
                            this.onStopQuestion();
                        }
                    } />
                </div>
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
        answeredQuestions: state.roundStore.round.answeredQuestions === undefined ? [] : state.roundStore.round.answeredQuestions,
        answers: state.roundStore.round.currentQuestion === null ? [] : state.roundStore.round.currentQuestion.teamAnswers,
    };
}

RoundRateTeamAnswers.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(RoundRateTeamAnswers);
