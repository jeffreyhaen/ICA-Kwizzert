

class PlayedQuestion {
    constructor(question, teamAnswers = []) {
        this.question = question;
        this.teamAnswers = teamAnswers;
    }
};

module.exports = PlayedQuestion;