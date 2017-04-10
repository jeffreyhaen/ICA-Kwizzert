export const onRoundDetailsReceived = (round) => {
    return {
        type: 'ON_ROUND_DETAILS_RECEIVED',
        payload: { round: round },
    }
}