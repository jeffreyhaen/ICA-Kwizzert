
/* Used to register an answer for the given question in the given game that has been put by a team. */
class RegisterTeamAnswer {
    constructor(gameId, roundId, teamId, questionId, value) {
        this.type = "RegisterTeamAnswer";
        this.gameId = gameId;
        this.roundId = roundId;
        this.teamId = teamId;
        this.questionId = questionId;
        this.value = value;
    }
}

module.exports = RegisterTeamAnswer;