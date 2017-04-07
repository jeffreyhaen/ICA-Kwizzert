
/* Used to send back available games to the client that has requested the list. 
   See class RequestGameList for the request. */
class ResponseGameList {
    constructor(games) {
        this.type = "ResponseGameList";
        this.games = games;
    }
}

module.exports = ResponseGameList;