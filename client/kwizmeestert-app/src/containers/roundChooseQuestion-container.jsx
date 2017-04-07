import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';
import { onRoundQuestionsReceived, onQuestionSelect } from '../actions/on-round';

const { RequestRoundInformation, ResponseRoundInformation, ChooseQuestion } = require('../../../../utilities/DAL/communication-protocol/');

class RoundChooseQuestions extends Component {
    constructor(props) {
        super(props);
        
        this.reloadQuestionList();
    }

    reloadQuestionList() {

        let requestRoundInformation = new RequestRoundInformation(this.props.game.name, this.props.game.rounds.length);

        this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {
            this.props.onRoundQuestionsReceived(responseRoundInformation.round.questions);
            this.props.socket.off(responseRoundInformation.type);
        });

        this.props.socket.emit(requestRoundInformation.type, requestRoundInformation);
    }

    onQuestionStateChange(element, id, state) {
        if (state) {
             if (this.props.selectedQuestion === undefined) {
                this.props.onQuestionSelect(id);
             } 
             else {
                 element.value(false);
             }
        }
        else {
            if (this.props.selectedQuestion === id) {
                this.props.onQuestionSelect(undefined);
            }
        }
    }

    onQuestionSubmit() {
        if (this.props.selectedQuestion !== undefined) {
            let chooseQuestion = new ChooseQuestion(this.props.game.name, this.props.game.rounds.length, this.props.selectedQuestion);
            this.props.socket.emit(chooseQuestion.type, chooseQuestion);

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
                <input type="button" className="btn btn-primary pull-right" value="Start" disabled={this.props.selectedQuestion === undefined} onClick={(e) => {
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
            onRoundQuestionsReceived: onRoundQuestionsReceived,
            onQuestionSelect: onQuestionSelect,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,

        availableQuestions: state.roundStore.availableQuestions,
        selectedQuestion: state.roundStore.selectedQuestion,
    };
}

RoundChooseQuestions.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(RoundChooseQuestions);