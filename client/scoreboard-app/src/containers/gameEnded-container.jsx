import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const constants = require('../../../../utilities/constants.js')

class GameEndedContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading" style={{ textAlign: 'center' }}>
                        <b>Eindstand</b>
                    </div>
                    <div className="panel-body">
                        {
                            this.props.game.teams.sort((a, b) => a.points > b.points).reverse().map((team, index) => {
                                let element = null;
                                switch (index) {
                                    case 0:
                                        element = <h1>1. {team.name}: {team.points}</h1>
                                        break;
                                    case 1:
                                        element = <h2>2. {team.name}: {team.points}</h2>
                                        break;
                                    case 2:
                                        element = <h3>3. {team.name}: {team.points}</h3>
                                        break;
                                    default:
                                        break;
                                }

                                return (element);
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
    };
}

export default connect(mapStateToProps)(GameEndedContainer);
