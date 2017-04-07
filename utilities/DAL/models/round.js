
class Round {
    constructor(number, questions, answeredQuestions = [], currentQuestion = null) {
        this.number = number;
        this.questions = questions;
        this.answeredQuestions = answeredQuestions;
        this.currentQuestion = currentQuestion;
    }
};

module.exports = Round;