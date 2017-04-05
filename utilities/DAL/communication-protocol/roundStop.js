
/* Used to stop the given round in the given game. */
class RoundStop {
    constructor(gameId, roundId) {
        this.type = "RoundStop";
        this.gameId = gameId;
        this.roundId = roundId;
    }
}

module.exports = RoundStop;