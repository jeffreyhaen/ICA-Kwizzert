
class QuestionSelect {
    constructor(gameId, roundId, questionId) {
        this.type = "QuestionSelect";
        this.gameId = gameId;
        this.roundId = roundId;
        this.questionId = questionId;
    }
}

module.exports = QuestionSelect;