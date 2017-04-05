
/* Used to start the given game. */
class GameStart {
    constructor(gameId) {
        this.type = "GameStart";
        this.gameId = gameId;
    }
}

module.exports = GameStart;