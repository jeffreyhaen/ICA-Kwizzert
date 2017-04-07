

class CurrentQuestion {
    constructor(question, teamAnswers = []) {
        this.question = question;
        this.teamAnswers = teamAnswers;
    }
};

module.exports = CurrentQuestion;