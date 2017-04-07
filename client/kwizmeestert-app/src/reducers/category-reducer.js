const initialCategoryState = {
    categories: [],
    selectedCategories: [],
};

import update from 'immutability-helper';

export default function (state = initialCategoryState, action) {
    switch (action.type) {
        case 'ON_CATEGORIES_RECEIVED':

            return update(state, {
                categories: {
                    $set: action.payload.categoryList
                },
            });

            break;

        case 'ON_CATEGORY_SELECT':

            return update(state, {
                selectedCategories: {
                    $push: [action.payload.categoryId]
                },
            });

            break;

        case 'ON_CATEGORY_DESELECT':

            return update(state, {
                selectedCategories: {
                    $set: state.selectedCategories.filter((item) => item != action.payload.categoryId)
                }
            });

            break;
    }

    return state;
}