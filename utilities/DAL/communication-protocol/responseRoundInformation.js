
/* Used to send back available information about the round to the client that has requested the information.
   See class RequestGameInformation for the request. */
class ResponseRoundInformation {
    constructor(round) {
        this.type = "ResponseRoundInformation";
        this.round = round;
    }
}

module.exports = ResponseRoundInformation;