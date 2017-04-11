
/* Used to send a list of historic games. 
   See class RequestGameHistory for the request. */
class ResponseGameHistory {
    constructor(games = []) {
        this.type = "ResponseGameHistory";
        this.games = games;
    }
}

module.exports = ResponseGameHistory;