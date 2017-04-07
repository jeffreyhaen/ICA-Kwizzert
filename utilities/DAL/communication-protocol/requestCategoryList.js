
/* Used by clients to request a list of categories. 
   See class ResponseCategoryList for the response. */
class RequestCategoryList {
    constructor() {
        this.type = "RequestCategoryList";
    }
}

module.exports = RequestCategoryList;