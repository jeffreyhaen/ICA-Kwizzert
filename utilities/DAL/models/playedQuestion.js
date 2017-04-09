

class PlayedQuestion {
    constructor(question, open = false, teamAnswers = []) {
        this.question = question;
        this.open = open;
        this.teamAnswers = teamAnswers;
    }
};

module.exports = PlayedQuestion;