
/* Used to start the given game. */
class StartGame {
    constructor(gameId) {
        this.type = "StartGame";
        this.gameId = gameId;
    }
}

module.exports = StartGame;