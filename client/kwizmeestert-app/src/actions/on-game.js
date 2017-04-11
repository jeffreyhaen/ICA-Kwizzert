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

export const onGameHistoryReceived = (gameHistoryList) => {
    return {
        type: 'ON_GAME_HISTORY_RECEIVED',
        payload: { gameHistoryList: gameHistoryList },
    }
}

export const onGameHistoryEntrySelect = (gameId) => {
    return {
        type: 'ON_GAME_HISTORY_ENTRY_SELECT',
        payload: { gameId: gameId },
    }
}