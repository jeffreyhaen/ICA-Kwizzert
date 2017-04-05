
/* Used to register an answer for the given question in the given game that has been put by a team. */
class RegisterAnswer {
    constructor(gameId, teamId, questionId, value) {
        this.type = "RegisterAnswer";
        this.gameId = gameId;
        this.teamId = teamId;
        this.questionId = questionId;
        this.value = value;
    }
}

module.exports = RegisterAnswer;