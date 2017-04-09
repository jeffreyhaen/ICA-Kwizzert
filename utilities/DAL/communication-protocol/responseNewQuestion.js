
/* Used to send the a new questionto the clients that needs this information.
   See also event onStartQuestion. */
class ResponseNewQuestion {
    constructor(answer) {
        this.type = "ResponseNewQuestion";
        this.question = question;
    }
}

module.exports = ResponseNewQuestion;