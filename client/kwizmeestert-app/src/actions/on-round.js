export const onRoundQuestionsReceived = (questions) => {
    return {
        type: "ON_ROUND_QUESTIONS_RECEIVED",
        payload: { questions: questions},
    }
}

export const onQuestionSelect = (questionId) => {
    return {
        type: 'ON_ROUND_QUESTION_SELECT',
        payload: { questionId: questionId },
    }
}

export const onRoundAnswersReceived = (answers) => {
    return {
        type: 'ON_ROUND_ANSWERS_RECEIVED',
        payload: { answers: answers },
    }
}