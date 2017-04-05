export const onGameReceiveList = (gameList) => {
    return {
        type: 'ON_GAME_RECEIVE_LIST',
        payload: { gameList: gameList },
    }
}