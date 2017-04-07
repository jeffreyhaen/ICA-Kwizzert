
/* Used to get information about the given round. 
   See class ResponseGameInformation for the response. */
class RequestRoundInformation {
    constructor(gameId, roundId) {
        this.type = "RequestRoundInformation";
        this.gameId = gameId;
        this.roundId = roundId;
    }
}

module.exports = RequestRoundInformation;