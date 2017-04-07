
class Team {
    constructor(name, accepted = null) {
        this.name = name;
        this.accepted = accepted;
    }

    getKey() {
        return this.name;
    }

    compareKey(teamId) {
        return this.name === teamId;
    }
};

module.exports = Team;