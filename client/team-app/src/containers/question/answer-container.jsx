import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { onRoundInformationReceived } from '../../actions/on-round';
import { onTeamReceived } from '../../actions/on-team';
import QuestionStatsContainer from './stats-container';

const { RegisterTeamAnswer, ResponseRoundInformation, RequestTeamInformation, ResponseTeamInformation } = require('../../../../../utilities/DAL/communication-protocol/');

class AnswerContainer extends Component {
    constructor(props) {
        super(props);

        this.listenForTeamInformation();
        this.listenForRoundInformation();
    }

    listenForRoundInformation() {
        this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {

            let requestTeamInformation = new RequestTeamInformation(this.props.game.name, this.props.teamId);
            this.props.socket.emit(requestTeamInformation.type, requestTeamInformation);

            this.props.onRoundInformationReceived(responseRoundInformation.round);
        });
    }

    listenForTeamInformation() {
        this.props.socket.on(new ResponseTeamInformation().type, (responseTeamInformation) => {
            this.props.onTeamReceived(responseTeamInformation.team);
        });
    }

    componentWillUnmount() {
        this.props.socket.off(new ResponseRoundInformation().type);
        this.props.socket.off(new ResponseTeamInformation().type);
    }

    onTeamRegisterAnswer(value) {
        if (this.props.round.currentQuestion.open) {

            let teamRegisterAnswer = new RegisterTeamAnswer(this.props.game.name, this.props.round.number, this.props.teamId, this.props.round.currentQuestion.question.value, value);
            this.props.socket.emit(teamRegisterAnswer.type, teamRegisterAnswer);
        }
    }

    render() {
        return (
            <div className="container">
                <QuestionStatsContainer round={this.props.round} teamId={this.props.teamId} team={this.props.team} game={this.props.game.name} />
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <b><p>Vraag</p></b>
                    </div>
                    <div className="panel-body">
                        {
                            (this.props.round.currentQuestion === null || !this.props.round.currentQuestion.open) &&
                            <h3>Wachtend op vraag...</h3>
                        }
                        {
                            (this.props.round.currentQuestion !== null && this.props.round.currentQuestion.open) &&
                            <div>
                                <p>Vraag: {this.props.round.currentQuestion.question.value} ({this.props.round.currentQuestion.question.category.name})</p>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    this.onTeamRegisterAnswer(e.target.answer.value);
                                }}>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="antwoord" name="answer" />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Invoeren" disabled={!this.props.round.currentQuestion.open} />
                                </form>
                            </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onRoundInformationReceived: onRoundInformationReceived,
            onTeamReceived: onTeamReceived,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
        round: state.roundStore.round,
        team: state.teamStore.team,

        teamId: state.teamStore.name,
    };
}

AnswerContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(AnswerContainer);
