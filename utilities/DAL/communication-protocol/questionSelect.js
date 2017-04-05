
/* Used to select a new question to answer in the given game. */
class QuestionSelect {
    constructor(gameId, questionId) {
        this.type = "QuestionSelect";
        this.gameId = gameId;
        this.roundId = roundId;
        this.questionId = questionId;
    }
}

module.exports = QuestionSelect;