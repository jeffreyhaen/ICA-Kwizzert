const initialTeamState = {
   name: "",
};

import update from 'immutability-helper';

export default function (state = initialTeamState, action) {
    switch (action.type) {
        case 'ON_TEAMNAME_SET':

            return update(state, 
            {
                name: { $set: action.payload.teamId },
            });
            
            break;
    }
    
    return state;
}