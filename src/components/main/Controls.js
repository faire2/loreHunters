import React, {useContext} from 'react';
import {PlayerStateContext} from "../../Contexts";
import {socket} from "../../server/socketConnection";
import {TRANSMISSIONS} from "../../data/idLists";
import {useHistory} from "react-router-dom";

export const Controls = (props) => {
    const playerStateContext = useContext(PlayerStateContext);
    const isActivePlayer = playerStateContext.isActivePlayer;

    function restartGame() {
        socket.emit(TRANSMISSIONS.newGame, {})
    }

    const containerStyle = {
        position: "absolute",
        top: "43vw",
        left: "47vw"
    }

    const history = useHistory();
    return (
        <div style={containerStyle}>
            <div style={{display: "flex", flexFlow: "row", justifyContent: "space-evenly"}}>
                {playerStateContext.playerState.activeEffects[0]}
                {isActivePlayer ? <p>Your turn! Actions: {playerStateContext.playerState.actions}</p> :
                    <p>Wait for your turn...</p>}
            </div>
            <button className="btn-primary" onClick={() => playerStateContext.nextPlayer()}>next player</button>
            <button className="btn-primary" onClick={() => playerStateContext.handleEndRound()}>end of  round</button>
            <button className="btn-primary" onClick={() => restartGame()}>restart game</button>
            <button className="btn-primary"
                    onClick={() => history.push({pathname: "/scoring", data: playerStateContext.playerState})}>scoring
            </button>
        </div>
    )
};
