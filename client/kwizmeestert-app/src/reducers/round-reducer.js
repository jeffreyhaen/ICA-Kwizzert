const initialRoundState = {
   availableQuestions: [],
   answers: [],
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

        case 'ON_ROUND_ANSWERS_RECEIVED':

            return update(state,
            {
                answers: { $set: action.payload.answers },
            })
    }
    
    return state;
}