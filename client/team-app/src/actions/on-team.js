export const onTeamNameSet = (teamId) => {
    return {
        type: 'ON_TEAMNAME_SET',
        payload: { teamId: teamId},
    }
}