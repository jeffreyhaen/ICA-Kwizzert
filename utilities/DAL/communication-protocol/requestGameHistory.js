
/* Used by kwizmeestert to request a list of historic games. 
   See class ResponseGameHistory for the response. */
class RequestGameHistory {
    constructor() {
        this.type = "RequestGameHistory";
    }
}

module.exports = RequestGameHistory;