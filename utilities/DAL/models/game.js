
class Game {
    constructor(name, started = false, rounds = [], teams = []) {
        this.name = name;
        this.started = started;
        this.rounds = rounds;
        this.teams = teams;
    }
};

module.exports = Game;