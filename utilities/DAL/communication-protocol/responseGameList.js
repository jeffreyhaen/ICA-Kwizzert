
/* Used to send back available games to the client that has requested the list. 
   See class RequestGameList for the request. */
class ResponseGameList {
    constructor(gameIds) {
        this.type = "ResponseGameList";
        this.gameIds = gameIds;
    }
}

module.exports = ResponseGameList;