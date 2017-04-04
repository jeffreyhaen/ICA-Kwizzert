
class RateTeamRegistration {
    constructor(gameId, teamId, accepted) {
        this.type = "RateTeamRegistration";
        this.gameId = gameId;
        this.teamId = teamId;
        this.accepted = accepted;
    }
}

module.exports = RateTeamRegistration;