
/* Used to stop the current question in the given round and game. */
class StopQuestion {
    constructor(gameId, roundId) {
        this.type = "StopQuestion";
        this.gameId = gameId;
        this.roundId = roundId;
    }
}

module.exports = StopQuestion;