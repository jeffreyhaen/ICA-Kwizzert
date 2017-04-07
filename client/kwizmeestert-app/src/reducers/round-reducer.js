const initialRoundState = {
   availableQuestions: [],
   selectedQuestion: undefined,
};

import update from 'immutability-helper';

export default function (state = initialRoundState, action) {
    switch (action.type) {
        case 'ON_ROUND_QUESTIONS_RECEIVED':

            return update(state, 
            {
                availableQuestions: { $set: action.payload.questions },
            });

            break;

        case 'ON_ROUND_QUESTION_SELECT':

            return update(state, 
            {
                selectedQuestion: { $set: action.payload.questionId },
            });

            break;
    }
    
    return state;
}