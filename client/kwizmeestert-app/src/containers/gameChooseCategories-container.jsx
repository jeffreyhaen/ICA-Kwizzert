import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';
import { onCategoriesReceived, onCategorySelect, onCategoryDeselect } from '../actions/on-category';

const { RequestCategoryList, ResponseCategoryList, ChooseCategories } = require('../../../../utilities/DAL/communication-protocol/');

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
            if (this.props.selectedCategories.length >= 3) {
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
        if (this.props.selectedCategories.length === 3) {
            let chooseCategories = new ChooseCategories(this.props.game.name, this.props.selectedCategories);
            
            this.props.socket.emit(chooseCategories.type, chooseCategories);

            this.context.router.push('/chooseQuestion');
        }
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
                <input type="button" className="btn btn-primary pull-right" value="Doorgaan" disabled={this.props.selectedCategories.length !== 3} onClick={(e) => {
                    e.preventDefault();
                    this.onCategoriesSubmit();
                }} />
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
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socketStore.socket,
        game: state.gameStore.game,

        categories: state.categoryStore.categories,
        selectedCategories: state.categoryStore.selectedCategories,
    };
}

GameChooseCategories.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(GameChooseCategories);
