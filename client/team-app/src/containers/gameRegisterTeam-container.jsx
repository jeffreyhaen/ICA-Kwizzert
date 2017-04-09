import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { onTeamNameSet } from '../actions/on-team';

const { RegisterTeam } = require('../../../../utilities/DAL/communication-protocol/');

class GameRegisterContainer extends Component {
    constructor(props) {
        super(props);

    }

    onRegisterTeam(teamName) {
        let registerTeam = new RegisterTeam(this.props.game.name, teamName);
        this.props.socket.emit(registerTeam.type, registerTeam);

        this.props.onTeamNameSet(teamName);

        this.context.router.push('/question');
    }


    render() {
        return (
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.onRegisterTeam(e.target.teamnaam.value);
                }}>
                    <div className="form-group">
                        <p>Game: {this.props.game.name}</p>
                        <input className="form-control" placeholder="Teamnaam" name="teamnaam" />
                    </div>
                    <input type="submit" className="btn btn-success" value="Registreer" />
                </form>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onTeamNameSet: onTeamNameSet,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
    };
}

GameRegisterContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(GameRegisterContainer);
