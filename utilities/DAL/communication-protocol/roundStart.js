
class RoundStart {
    constructor(gameId, questionIds, maximumThinkingTime) {
        this.type = "RoundStart";
        this.gameId = gameId;
        this.questionIds = questionIds;
        this.maximumThinkingTime = maximumThinkingTime;
    }
}

module.exports = RoundStart;