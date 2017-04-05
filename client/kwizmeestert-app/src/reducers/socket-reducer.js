const initialSocketState = {
   socket: undefined,
};

import update from 'immutability-helper';

export default function (state = initialSocketState, action) {
    switch (action.type) {
        case 'ON_SOCKET_INITIALIZE':

            return update(state, 
            {
                socket: { $set: action.payload.socket },
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