
class ChooseCategories {
    constructor(gameId, categoryIds) {
        this.type = "ChooseCategories";
        this.gameId = gameId;
        this.categoryIds = categoryIds;
    }
}

module.exports = ChooseCategories;