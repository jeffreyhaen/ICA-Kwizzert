import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGameReceiveList } from '../actions/on-game';

const RequestGameList = require('../../../../utilities/DAL/communication-protocol/requestGameList');
const ResponseGameList = require('../../../../utilities/DAL/communication-protocol/responseGameList');

class GameContainer extends Component {
    constructor(props) {
        super(props);

        let requestGameList = new RequestGameList();

        console.log(this.props);
        this.props.socket.on(new ResponseGameList().type, (responseGameList) => { 
            console.log("test callback gamelist");
            this.props.onGameReceiveList(responseGameList.gameIds);
            this.props.socket.off(responseGameList.type);
        });

        this.props.socket.emit(requestGameList.type, requestGameList);
    }

    render() {
        console.log('ren-d');
        console.log(this.props.gameList);
        return (
            <div>
                {
                    this.props.gameList.map((val) => {
                        return (<p>{`game id: ${val}`}</p>)
                    })
                }
            </div>
        );  
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onGameReceiveList: onGameReceiveList,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        gameList: state.gameStore.gameList,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(GameContainer);
