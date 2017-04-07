
/* Used to start a new round in the given game. */
class StartRound {
    constructor(gameId, questionIds, maximumThinkingTime) {
        this.type = "StartRound";
        this.gameId = gameId;
        this.questionIds = questionIds;
        this.maximumThinkingTime = maximumThinkingTime;
    }
}

module.exports = StartRound;