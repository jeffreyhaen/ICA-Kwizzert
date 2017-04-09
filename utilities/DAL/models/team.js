
class Team {
    constructor(name, accepted = null, points = 0) {
        this.name = name;
        this.accepted = accepted;
        this.points = points;
    }
};

module.exports = Team;