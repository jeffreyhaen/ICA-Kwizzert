import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';
import { onRoundInformationReceived, onQuestionSelect } from '../actions/on-round';

const { RequestRoundInformation, ResponseRoundInformation, StartQuestion } = require('../../../../utilities/DAL/communication-protocol/');

class RoundChooseQuestions extends Component {
    constructor(props) {
        super(props);
        
        this.reloadQuestionList();
    }

    reloadQuestionList() {

        let requestRoundInformation = new RequestRoundInformation(this.props.game.name, this.props.game.rounds.length);

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

            this.context.router.push('/rateTeamAnswers');
        }
    }

    render() {
        return (
            <div className="container">
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
                <input type="button" className="btn btn-primary pull-right" value="Start" disabled={this.props.selectedQuestion === null} onClick={(e) => {
                    e.preventDefault();
                    this.onQuestionSubmit();
                }} />
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

        availableQuestions: state.roundStore.round === undefined ? [] : state.roundStore.round.questions, // -answeredQuestions
        selectedQuestion: state.roundStore.selectedQuestion,
    };
}

RoundChooseQuestions.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(RoundChooseQuestions);
