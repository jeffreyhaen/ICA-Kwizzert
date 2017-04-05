
class GameInformation {
    constructor(gameId, teamInformation, timeleft) {
        this.type = "GameInformation";
        this.gameId = gameId;
        this.teamInformation = teamInformation;
        this.timeleft = timeleft;
    }
}

module.exports = GameInformation;