const initialRoundState = {
   round: {
        number: 0,
        questions: [],
        answeredQuestions: [],
        currentQuestion: null,
   },
   answers: [],
   selectedQuestion: null,
};

import update from 'immutability-helper';

export default function (state = initialRoundState, action) {
    switch (action.type) {
        case 'ON_ROUND_INFORMATION_RECEIVED':

            return update(state, 
            {
                round: { $set: action.payload.round },
            });

            break;
    }
    
    return state;
}