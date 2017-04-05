
/* Used to rate an answer put by a team (approve or disapprove). */
class RateTeamAnswer {
    constructor(gameId, teamId, questionId, value) {
        this.type = "RateTeamAnswer";
        this.gameId = gameId;
        this.teamId = teamId;
        this.questionId = questionId;
        this.value = value;
    }
}

module.exports = RateTeamAnswer;