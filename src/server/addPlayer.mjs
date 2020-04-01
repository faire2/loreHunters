// insert player into null position push him to the end
export default function addPlayer(players, socketId) {
    if (players.length === 0) {
        players.push(socketId)
    } else {
        for (let i = 0; i < players.length; i++) {
            if (i === players.length - 1 && players[i] !== false) {
                players.push(socketId);
                break;
            } else if (players[i] === false) {
                players.splice(i, 1, socketId);
                break;
            }
        }
    }
    return players;
}