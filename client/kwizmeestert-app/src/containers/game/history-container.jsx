import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { onGameHistoryReceived, onGameHistoryEntrySelect } from '../../actions/on-game'

const { RequestGameHistory, ResponseGameHistory } = require('../../../../../utilities/DAL/communication-protocol/');

class GameHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.reloadGameHistoryList();
    }

    reloadGameHistoryList() {
        let requestGameHistory = new RequestGameHistory();

        this.props.socket.on(new ResponseGameHistory().type, (responseGameHistory) => {
            this.props.onGameHistoryReceived(responseGameHistory.games);
        });

        this.props.socket.emit(requestGameHistory.type, requestGameHistory);
    }

    setSelectedGame(gameId) {
        this.props.onGameHistoryEntrySelect(gameId);
    }

    componentWillUnmount() {
        this.props.socket.off(new ResponseGameHistory().type);
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Rondes</th>
                            <th>Uitslagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.gameHistoryList.map((game, index) => {
                                if (game.name === this.props.selectedHistoricGameId) {
                                    return (
                                        <tr key={index}>
                                            <td>{game.name}</td>
                                            <td><ul>{
                                                game.rounds.map((round, index) => {
                                                     return (
                                                        <li key={index}>Ronde: {round.number}
                                                            <ul>
                                                                {
                                                                    round.answeredQuestions.map((answeredQuestion, index) =>{
                                                                        return (
                                                                            <li key={index}>
                                                                            <b>Vraag</b>: {answeredQuestion.question.value} <br />
                                                                            <b>Antwoord</b>: {answeredQuestion.question.answer} <br />
                                                                            <b>Category</b>: {answeredQuestion.question.category.name} <br />
                                                                            <b>Teamantwoorden:</b>
                                                                            <ul>
                                                                                {
                                                                                    answeredQuestion.teamAnswers.map((teamAnswer, index) => {
                                                                                        return (
                                                                                            <li key={index}>
                                                                                                <b>Team</b>: {teamAnswer.team.name} <br />
                                                                                                <b>Antwoord</b>: {teamAnswer.value} <br />
                                                                                                <b>Goedgekeurd</b>: {teamAnswer.accepted === true ? 'Ja' : 'Nee'} <br />
                                                                                            </li>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                <hr />
                                                                            </ul>
                                                                        </li>)
                                                                    })
                                                                }
                                                            </ul>
                                                        </li>
                                                        );
                                                })
                                                }</ul></td>
                                            <td><ul>{
                                                game.teams.map((team, index) => {
                                                    return (
                                                        <li key={index}>{team.name}: {team.points}</li>
                                                        );
                                                })
                                                }</ul></td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr key={index} onClick={() => {
                                            this.setSelectedGame(game.name);
                                        }}>
                                            <td>{game.name}</td>
                                            <td>{game.rounds.length + 1} rondes</td>
                                            <td>{game.teams.length + 1}</td>
                                        </tr>
                                    )
                                }
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
            onGameHistoryReceived: onGameHistoryReceived,
            onGameHistoryEntrySelect: onGameHistoryEntrySelect,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        gameHistoryList: state.gameStore.gameHistoryList,
        selectedHistoricGameId: state.gameStore.selectedHistoricGameId,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(GameHistoryContainer);
