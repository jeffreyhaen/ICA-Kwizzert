
/* Used to choose a new question to answer in the given round/game. */
class ChooseQuestion {
    constructor(gameId, roundId, questionId) {
        this.type = "ChooseQuestion";
        this.gameId = gameId;
        this.roundId = roundId;
        this.questionId = questionId;
    }
}

module.exports = ChooseQuestion;