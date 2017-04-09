import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';
import { onRoundInformationReceived, onQuestionSelect } from '../actions/on-round';

const { RequestRoundInformation, ResponseRoundInformation, StartQuestion, StopRound } = require('../../../../utilities/DAL/communication-protocol/');
const constants = require('../../../../utilities/constants.js')

class RoundChooseQuestions extends Component {
    constructor(props) {
        super(props);
        
        this.reloadQuestionList();
    }

    reloadQuestionList() {

        let requestRoundInformation = new RequestRoundInformation(this.props.game.name, this.props.round.number);

        this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {
            this.props.onRoundInformationReceived(responseRoundInformation.round);
            this.props.socket.off(responseRoundInformation.type);
        });

        this.props.socket.emit(requestRoundInformation.type, requestRoundInformation);
    }

    onQuestionStateChange(element, id, state) {
        if (state) {
             if (this.props.selectedQuestion === null) {
                this.props.onQuestionSelect(id);
             } 
             else {
                 element.value(false);
             }
        }
        else {
            if (this.props.selectedQuestion === id) {
                this.props.onQuestionSelect(null);
            }
        }
    }

    onQuestionSubmit() {
        if (this.props.selectedQuestion !== undefined) {
            let startQuestion = new StartQuestion(this.props.game.name, this.props.round.number, this.props.selectedQuestion);
            this.props.socket.emit(startQuestion.type, startQuestion);

            this.props.onQuestionSelect(null);
            this.context.router.push('/rateTeamAnswers');
        }
    }

    onRoundStop() {
        let stopRound = new StopRound(this.props.game.name, this.props.round.number);

        this.props.socket.emit(stopRound.type, stopRound);

        this.context.router.push('/chooseCategories');
    }

    render() {
        return (
            <div className="container">
                <h2>Ronde: {this.props.round.number} / Vraag: {this.props.answeredQuestions.length+1}</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vraag</th>
                            <th>Category</th>
                            <th>Selecteer</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.props.availableQuestions.map((question, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{question.value}</td>
                                        <td>{question.category.name}</td>
                                        <td><Switch onText="Ja" offText="Nee" id={question.value} defaultValue={false} onChange={ (element, state) => {
                                            this.onQuestionStateChange(element, question.value, state);
                                        }} /></td>
                                    </tr>
                                )
                                })
                            }
                    </tbody>
                </table>
                <div className="pull-right">
                    <input type="button" className="btn btn-primary" value="Start vraag" disabled={this.props.selectedQuestion === null} onClick={ () => {
                        this.onQuestionSubmit();
                    }} />{" "}
                    <input type="button" className="btn btn-primary" value="Sluit ronde" onClick={ () => {
                        this.onRoundStop();
                    }} />
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onRoundInformationReceived: onRoundInformationReceived,
            onQuestionSelect: onQuestionSelect,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
        round: state.roundStore.round,

        answeredQuestions: state.roundStore.round.answeredQuestions === undefined ? [] : state.roundStore.round.answeredQuestions,
        availableQuestions: state.roundStore.round === undefined ? [] : 
            state.roundStore.round.questions.filter((question) => state.roundStore.round.answeredQuestions.find((answeredQuestion) => question.value === answeredQuestion.question.value) === undefined),
        selectedQuestion: state.roundStore.selectedQuestion,
    };
}

RoundChooseQuestions.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(RoundChooseQuestions);
