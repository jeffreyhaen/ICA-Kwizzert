export const onCategoriesReceived = (categoryList) => {
    return {
        type: 'ON_CATEGORIES_RECEIVED',
        payload: { categoryList: categoryList },
    }
}

export const onCategorySelect = (categoryId) => {
    return {
        type: 'ON_CATEGORY_SELECT',
        payload: { categoryId: categoryId },
    }
}

export const onCategoryDeselect = (categoryId) => {
    return {
        type: 'ON_CATEGORY_DESELECT',
        payload: { categoryId: categoryId },
    }
}

export const onCategoryClear = () => {
    return {
        type: 'ON_CATEGORY_CLEAR',
    }
}