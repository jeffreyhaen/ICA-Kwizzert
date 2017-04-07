
/* Used to choose and start a new question to answer by teams in the given round and game. */
class StartQuestion {
    constructor(gameId, roundId, questionId) {
        this.type = "StartQuestion";
        this.gameId = gameId;
        this.roundId = roundId;
        this.questionId = questionId;
    }
}

module.exports = StartQuestion;