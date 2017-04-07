
/* Used to send the given answer by a team to the client that needs this information.
   See also class registerTeamAnswer and rateTeamAnswer. */
class ResponseTeamAnswer {
    constructor(answer) {
        this.type = "ResponseTeamAnswer";
        this.answer = answer;
    }
}

module.exports = ResponseTeamAnswer;