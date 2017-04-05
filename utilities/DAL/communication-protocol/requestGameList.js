
/* Used by clients to request a list of games. 
   See class ResponseGameList for the response. */
class RequestGameList {
    constructor() {
        this.type = "RequestGameList";
    }
}

module.exports = RequestGameList;