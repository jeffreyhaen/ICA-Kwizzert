const initialQuestionState = {
   question: undefined,
};

import update from 'immutability-helper';

export default function (state = initialQuestionState, action) {
    switch (action.type) {
        case 'ON_SOCKET_INITIALIZE':

            return update(state, 
            {
                socket: { $set: action.payload.socket },
            });

            break;
            
    }
    
    return state;
}