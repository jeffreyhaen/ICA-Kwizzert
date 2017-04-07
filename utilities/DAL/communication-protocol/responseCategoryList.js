
/* Used to send back available categories to the client that has requested the list. 
   See class RequestCategoryList for the request. */
class ResponseCategoryList {
    constructor(categories) {
        this.type = "ResponseCategoryList";
        this.categories = categories;
    }
}

module.exports = ResponseCategoryList;