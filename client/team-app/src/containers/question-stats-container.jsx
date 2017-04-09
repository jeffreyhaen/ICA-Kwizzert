import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const constants = require('../../../../utilities/constants.js')

class QuestionStatsContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <b><p>Statistieken van <i>{this.props.team}</i> in <i>{this.props.game}</i></p></b>
                    </div>
                    <div className="panel-body">
                        <p><b>Vraag:</b> {this.props.round.answeredQuestions.length + 1} / {constants.ROUND_QUESTION_AMOUNT}</p>
                        <p><b>Ronde:</b> {this.props.round.number}</p>
                        <p><b>Punten:</b> -</p>
                        <p><b>Positie:</b> -</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionStatsContainer;
