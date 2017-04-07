
class Question {
    constructor(category, value, answer, teamAnswers = []) {
        this.category = category;
        this.value = value;
        this.answer = answer; // Only for the KwizMeestert.
        this.teamAnswers = teamAnswers;
    }
};

module.exports = Question;