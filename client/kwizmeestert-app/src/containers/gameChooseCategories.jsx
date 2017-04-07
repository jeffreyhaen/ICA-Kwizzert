import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';

const { } = require('../../../../utilities/DAL/communication-protocol/');

class GameChooseCategories extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Categorie</th>
                            <th>Selecteer</th>
                        </tr>
                    </thead>
                    <tbody>
                            {/*this.props.game.teams.map((team, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{team.name}</td>
                                        <td><Switch onText="Ja" offText="Nee" id={team.name} defaultValue={ team.accepted===true } 
                                        onChange={(element, state) => {
                                            this.onTeamRateRegistration(this.props.gameId, team.name, state);
                                        }} /></td>
                                    </tr>
                                )
                            })*/}
                    </tbody>
                </table>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            //onGameDetailsReceived: onGameDetailsReceived,
        }, dispatch);
}

function mapStateToProps(state, props) {
    return {
        socket: state.socketStore.socket,
        gameId: props.params.gameId,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(GameChooseCategories);
