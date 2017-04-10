import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { onGameDetailsReceived } from '../actions/on-game';
import { onRoundDetailsReceived } from '../actions/on-round';

const { RequestGameInformation, ResponseGameInformation, ResponseRoundInformation } = require('../../../../utilities/DAL/communication-protocol/');

const constants = require('../../../../utilities/constants.js')

class GameScoreboardContainer extends Component {
    constructor(props) {
        super(props);
        this.reloadGameInformation();
        this.reloadRoundInformation();
    }

    reloadGameInformation() {
        this.props.socket.on(new ResponseGameInformation().type, (responseGameInformation) => {
            console.log(responseGameInformation);
            this.props.onGameDetailsReceived(responseGameInformation.game);
        });
    }

    reloadRoundInformation() {
        this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {
            console.log(responseRoundInformation);
            this.props.onRoundDetailsReceived(responseRoundInformation.round);
        });
    }
    
    componentWillUnmount() {
        this.props.socket.off(new ResponseRoundInformation().type);
        this.props.socket.off(new ResponseGameInformation().type);
    }

    render() {
        return (
            <div className="container">
                 <div className="panel panel-default">
                    <div className="panel-body" style={{textAlign: 'center'}}>
                        <h4>Ronde: {this.props.round.number} van de {constants.ROUND_QUESTION_AMOUNT}</h4>
                    </div>
                </div>

                <div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{textAlign: 'center'}}>
                                <b>Teams</b>
                            </div>
                            <div className="panel-body">
                                <ul>
                                    {
                                        this.props.game.teams.map((team, index) => {
                                            return (
                                                <li key={index}><b>{team.name}</b>: {team.points}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                     <div className="panel panel-default">
                        <div className="panel-heading" style={{textAlign: 'center'}}>
                            <b>
                                {
                                    (this.props.round.currentQuestion !== null) &&
                                        this.props.round.currentQuestion.question.category.name
                                }
                                {
                                    (this.props.round.currentQuestion === null) &&
                                        "Categorie"
                                }
                            </b>
                        </div>
                        <div className="panel-body">
                        {
                            (this.props.round.currentQuestion === null) &&
                            <h3>Wachtend op vraag...</h3>
                        }
                        {
                            (this.props.round.currentQuestion !== null && this.props.round.currentQuestion.open) &&
                            <h3>{this.props.round.currentQuestion.question.value}</h3>
                        }
                        {
                            (this.props.round.currentQuestion !== null && !this.props.round.currentQuestion.open) &&
                            <h3>{this.props.round.currentQuestion.question.answer}</h3>
                        }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onGameDetailsReceived: onGameDetailsReceived,
            onRoundDetailsReceived: onRoundDetailsReceived,
        }, dispatch);
}

function mapStateToProps(state, props) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
        round: state.roundStore.round,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(GameScoreboardContainer);
