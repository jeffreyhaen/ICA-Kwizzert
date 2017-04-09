const initialRoundState = {
   round: {
        number: 0,
        questions: [],
        answeredQuestions: [],
        currentQuestion: {
            open: true,
            teamAnswers: [],
        },
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