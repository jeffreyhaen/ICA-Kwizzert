
/* Used to stop the given round in the given game. */
class StopRound {
    constructor(gameId, roundId) {
        this.type = "StopRound";
        this.gameId = gameId;
        this.roundId = roundId;
    }
}

module.exports = StopRound;