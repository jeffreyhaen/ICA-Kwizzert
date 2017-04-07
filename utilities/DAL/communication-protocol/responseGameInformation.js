
/* Used to send back available information about the game to the client that has requested the information.
   See class RequestGameInformation for the request. */
class ResponseGameInformation {
    constructor(game) {
        this.type = "ResponseGameInformation";
        this.game = game;
    }
}

module.exports = ResponseGameInformation;