
class Game {
    constructor(name, started = false) {
        this.name = name;
        this.started = started;
        this.rounds = [];
        this.teams = [];
    }
};

module.exports = Game;