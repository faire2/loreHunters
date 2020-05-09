import React, {useContext} from 'react';
import {PlayerStateContext} from "../../Contexts";
import {ButtonGroup} from "react-bootstrap";
import {EFFECT} from "../../data/effects";

export const Controls = (props) => {
    const playerStateContext = useContext(PlayerStateContext);
    const isActivePlayer = playerStateContext.isActivePlayer;
    const destroyEffect = playerStateContext.playerState.activeEffects[0] === EFFECT.destroyCard
        || playerStateContext.playerState.activeEffects[0] === EFFECT.defeatGuardian;

    /*function restartGame() {
        socket.emit(TRANSMISSIONS.newGame, {})
    }*/

    const containerStyle = {
        position: "absolute",
        top: "38.2vw",
        left: "47vw",
        display: "flex",
        flexFlow: "row",
        alignItems: "baseline",
        fontSize: "1vw",
    };

    /*const history = useHistory();*/
    return (
        <div style={containerStyle}>
            <ButtonGroup aria-label="Control buttons">
                {/*<button className="btn-primary" onClick={() => playerStateContext.nextPlayer()}>next player</button>*/}
                {}
                {isActivePlayer && <button className="btn-primary" onClick={() => playerStateContext.handleEndRound()}>end of round</button>}
                {destroyEffect && <button className="btn-primary" onClick={() => playerStateContext.cancelEffects()}>cancel effect</button>}
                {/*<button className="btn-primary" onClick={() => restartGame()}>restart game</button>*/}
                {/*<button className="btn-primary"
                        onClick={()  => history.push({
                            pathname: "/scoring",
                            data: playerStateContext.playerState
                        })}>scoring
                </button>*/}
            </ButtonGroup>
            <div style={{display: "flex", flexFlow: "row", justifyContent: "space-evenly", marginLeft: "1vw"}}>
                {isActivePlayer ? <p>Your turn!&nbsp; {/*Actions: {playerStateContext.playerState.actions}*/}</p> :
                    <p>Wait for your turn...</p>}
                {" | "}{playerStateContext.playerState.activeEffects[0]}
            </div>
        </div>
    )
};
