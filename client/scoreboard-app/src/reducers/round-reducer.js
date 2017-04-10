const initialRoundState = {
   round: {
       currentQuestion: null,
       number: 1,
   }
};

import update from 'immutability-helper';

export default function (state = initialRoundState, action) {
    switch (action.type) {
        case 'ON_ROUND_DETAILS_RECEIVED':

            return update(state, 
            {
                round: { $set: action.payload.round },
            });
            
            break;
            
    }
    
    return state;
}