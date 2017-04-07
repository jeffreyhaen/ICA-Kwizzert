
class Game {
    constructor(name, started = false) {
        this.name = name;
        this.started = started;
        this.rounds = [];
        this.teams = [];
    }

    getKey() {
        return this.name;
    }

    compareKey(gameId) {
        return this.name === gameId;
    }
};

module.exports = Game;