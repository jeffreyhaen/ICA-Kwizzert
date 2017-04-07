
class TeamAnswer {
    constructor(team, question, value, accepted = null) {
        this.team = team,
        this.question = question;
        this.value = value;
        this.accepted = accepted;
    }
};

module.exports = TeamAnswer;