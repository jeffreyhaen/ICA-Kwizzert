
/* Used to get information about the given round. 
   See class ResponseGameInformation for the response. */
class RequestRoundInformation {
    constructor(roundId) {
        this.type = "RequestRoundInformation";
        this.roundId = roundId;
    }
}

module.exports = RequestRoundInformation;