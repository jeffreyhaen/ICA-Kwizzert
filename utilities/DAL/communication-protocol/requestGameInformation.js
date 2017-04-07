
/* Used to get information about the given game. 
   See class ResponseGameInformation for the response. */
class RequestGameInformation {
    constructor(gameId) {
        this.type = "RequestGameInformation";
        this.gameId = gameId;
    }
}

module.exports = RequestGameInformation;