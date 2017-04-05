
/* Used to register a new connected socket (client) and to determine its purpose (type). */
class RegisterClient {
    constructor(clientType) {
        this.type = "RegisterClient";
        this.clientType = clientType;
    }
}

module.exports = RegisterClient;