const initialGameState = {
   gameList: [],
   game: {
       teams: [],
       rounds: [],
       started: false,
       name: "",
   },

   gameHistoryList: [],
   selectedHistoricGameId: null,
};

import update from 'immutability-helper';

export default function (state = initialGameState, action) {
    switch (action.type) {
        case 'ON_GAME_RECEIVE_LIST':

            return update(state, 
            {
                gameList: { $set: action.payload.gameList },
            });
            
            break;

        case 'ON_GAME_DETAILS_RECEIVED':
            
            return update(state, 
            {
                game: { $set: action.payload.game },
            });

        case 'ON_GAME_HISTORY_RECEIVED':

            return update(state,
            {
                gameHistoryList: { $set: action.payload.gameHistoryList },
            });

        case 'ON_GAME_HISTORY_ENTRY_SELECT':

            return update(state,
            {
                selectedHistoricGameId: { $set: action.payload.gameId },
            })
    }
    
    return state;
}