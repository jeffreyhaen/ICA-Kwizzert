
/* Used to close the current question in the given round and game. So teams cannot send any more answers. */
class CloseQuestion {
    constructor(gameId, roundId) {
        this.type = "CloseQuestion";
        this.gameId = gameId;
        this.roundId = roundId;
    }
}

module.exports = CloseQuestion;