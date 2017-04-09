export const onGameReceiveList = (gameList) => {
    return {
        type: 'ON_GAME_RECEIVE_LIST',
        payload: { gameList: gameList },
    }
}

export const onGameDetailsReceived = (game) => {
    return {
        type: 'ON_GAME_DETAILS_RECEIVED',
        payload: { game: game },
    }
}