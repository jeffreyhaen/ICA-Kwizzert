
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