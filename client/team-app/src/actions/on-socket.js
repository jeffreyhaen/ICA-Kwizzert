export const onSocketInitialize = (socket) => {
    return {
        type: "ON_SOCKET_INITIALIZE",
        payload: { socket: socket},
    }
}