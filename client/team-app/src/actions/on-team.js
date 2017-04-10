export const onTeamNameSet = (teamId) => {
    return {
        type: 'ON_TEAMNAME_SET',
        payload: { teamId: teamId},
    }
}

export const onTeamReceived = (team) => {
    return {
        type: 'ON_TEAM_RECEIVED',
        payload: { team: team },
    }
}