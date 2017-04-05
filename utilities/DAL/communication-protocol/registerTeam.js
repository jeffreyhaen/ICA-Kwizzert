
/* Used to register a new team to the given game. */
class RegisterTeam {
    constructor(gameId, name) {
        this.type = "RegisterTeam";
        this.gameId = gameId;
        this.name = name;
    }
}

module.exports = RegisterTeam;