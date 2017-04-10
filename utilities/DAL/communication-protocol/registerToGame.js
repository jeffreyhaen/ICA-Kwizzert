
/* Used to register a existing client (socket) to the given game. */
class RegisterToGame {
    constructor(gameId) {
        this.type = "RegisterToGame";
        this.gameId = gameId;
    }
}

module.exports = RegisterToGame;