const initialTeamState = {
   name: "",
   team: {},
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

        case 'ON_TEAM_RECEIVED':

            return update(state,
            {
                team: { $set: action.payload.team },
            });
    }
    
    return state;
}