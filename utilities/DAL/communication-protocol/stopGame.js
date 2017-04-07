
/* Used to stop the given game. */
class StopGame {
    constructor(gameId) {
        this.type = "StopGame";
        this.gameId = gameId;
    }
}

module.exports = StopGame;