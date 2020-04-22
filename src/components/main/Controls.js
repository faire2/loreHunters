import React, {useContext} from 'react';
import {PlayerStateContext} from "../../Contexts";
import {socket} from "../../server/socketConnection";
import {TRANSMISSIONS} from "../../data/idLists";

export const Controls = (props) => {
    const playerStateContext = useContext(PlayerStateContext);

    function restartGame() {
        socket.emit(TRANSMISSIONS.newGame, {})
    }

    return (
        <div>
            <button className="btn-primary" onClick={() => playerStateContext.nextPlayer()}>next player</button>
            <button className="btn-primary" onClick={() => playerStateContext.handleEndRound()}>end of  round</button>
            <button className="btn-primary" onClick={() => restartGame()}>restart game</button>
        </div>
    )
};
