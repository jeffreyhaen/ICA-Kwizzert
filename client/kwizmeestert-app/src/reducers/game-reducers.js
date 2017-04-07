const initialGameState = {
   gameList: [],
   game: {
       teams: [],
       started: false,
       name: "",
   },
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
    }
    
    return state;
}