import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';
import { onCategoriesReceived, onCategorySelect, onCategoryDeselect, onCategoryClear } from '../../actions/on-category';
import { onRoundInformationReceived } from '../../actions/on-round';

const { RequestCategoryList, ResponseCategoryList, ChooseCategories, ResponseRoundInformation, StopGame } = require('../../../../../utilities/DAL/communication-protocol/');
const constants = require('../../../../../utilities/constants.js')

class GameChooseCategories extends Component {
    constructor(props) {
        super(props);
        
        this.reloadCategoryList();
    }

    reloadCategoryList() {
        let requestCategoryList = new RequestCategoryList();

        this.props.socket.on(new ResponseCategoryList().type, (responseCategoryList) => {
            this.props.onCategoriesReceived(responseCategoryList.categories);
            this.props.socket.off(responseCategoryList.type);
        });

        this.props.socket.emit(requestCategoryList.type, requestCategoryList);
    }

    onCategoryStateChange(element, id, state) {
        if (state) {
            if (this.props.selectedCategories.length >= constants.CATEGORIES_AMOUNT) {
                element.value(false);
            } 
            else {
                this.props.onCategorySelect(id);
            }
        } 
        else {
            this.props.onCategoryDeselect(id);
        }
    }

    onCategoriesSubmit() {
        if (this.props.selectedCategories.length === constants.CATEGORIES_AMOUNT) {

            let chooseCategories = new ChooseCategories(this.props.game.name, this.props.selectedCategories);

            this.props.socket.on(new ResponseRoundInformation().type, (responseRoundInformation) => {
                this.props.onRoundInformationReceived(responseRoundInformation.round);
                this.props.onCategoryClear();
                this.props.socket.off(responseRoundInformation.type);

                this.context.router.push('/chooseQuestion');
            });

            this.props.socket.emit(chooseCategories.type, chooseCategories);
        }
    }

    onGameStop() {
        let stopGame = new StopGame(this.props.game.name);
        this.props.socket.emit(stopGame.type, stopGame);

        this.context.router.push('/games');
    }

    render() {
        console.log(this.props.game);
        return (
            <div className="container">
                <h2>Nieuwe ronde starten ( {this.props.round.number  + 1} ):</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Categorie</th>
                            <th>Selecteer</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                this.props.categories.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{category.name}</td>
                                        <td><Switch onText="Ja" offText="Nee" id={category.name} defaultValue={false} onChange={ (element, state) => {
                                            this.onCategoryStateChange(element, category.name, state);
                                        }} /></td>
                                    </tr>
                                )
                                })
                            }
                    </tbody>
                </table>
                <div className="pull-right">
                    <input type="button" className="btn btn-danger" value="Beëindig game" onClick={(e) => {
                        e.preventDefault();
                        this.onGameStop();
                    }} />{" "}
                    <input type="button" className="btn btn-primary" value="Start ronde" disabled={this.props.selectedCategories.length !== constants.CATEGORIES_AMOUNT} onClick={(e) => {
                        e.preventDefault();
                        this.onCategoriesSubmit();
                    }} />
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onCategoriesReceived: onCategoriesReceived,
            onCategoryDeselect: onCategoryDeselect,
            onCategorySelect: onCategorySelect,
            onCategoryClear: onCategoryClear,

            onRoundInformationReceived: onRoundInformationReceived,
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,
        round: state.roundStore.round,

        categories: state.categoryStore.categories,
        selectedCategories: state.categoryStore.selectedCategories,
    };
}

GameChooseCategories.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(GameChooseCategories);
