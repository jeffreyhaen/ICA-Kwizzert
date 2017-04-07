export const onRoundInformationReceived = (round) => {
    return {
        type: "ON_ROUND_INFORMATION_RECEIVED",
        payload: { round: round},
    }
}

export const onQuestionSelect = (questionId) => {
    return {
        type: 'ON_ROUND_QUESTION_SELECT',
        payload: { questionId: questionId },
    }
}