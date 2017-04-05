
/* Used to start a new round in the given game. */
class RoundStart {
    constructor(gameId, questionIds, maximumThinkingTime) {
        this.type = "RoundStart";
        this.gameId = gameId;
        this.questionIds = questionIds;
        this.maximumThinkingTime = maximumThinkingTime;
    }
}

module.exports = RoundStart;