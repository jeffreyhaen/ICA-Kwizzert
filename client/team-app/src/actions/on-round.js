export const onRoundInformationReceived = (round) => {
    return {
        type: "ON_ROUND_INFORMATION_RECEIVED",
        payload: { round: round},
    }
}