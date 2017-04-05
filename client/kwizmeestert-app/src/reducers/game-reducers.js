const initialGameState = {
   gameList: [],
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
        /*case 'ON_USER_LOGOUT':
            
            return update(state, 
            {
                socket: { $set: undefined },
            });*/
    }
    
    return state;
}