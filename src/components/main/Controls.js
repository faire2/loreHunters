import React, {useContext} from 'react';
import {PlayerStateContext} from "../../Contexts";
import {ButtonGroup} from "react-bootstrap";
import {CANCELLABLE_EFFECTS} from "../functions/constants";

export const Controls = () => {
    const playerStateContext = useContext(PlayerStateContext);
    const isActivePlayer = playerStateContext.isActivePlayer;
    const activeEffect = playerStateContext.playerState.activeEffects[0];
    const notDiscardEffect = playerStateContext.playerState.activeEffects.length > 0 && CANCELLABLE_EFFECTS.includes(activeEffect);

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
                <button className="btn-primary" onClick={() => playerStateContext.getPlaneFor2Coins()}>plane</button>
                {playerStateContext.isActivePlayer && <button className="btn-primary" onClick={() => playerStateContext.undo()}>undo</button>}
                {playerStateContext.isActivePlayer && <button className="btn-primary" onClick={() => playerStateContext.revert()}>revert</button>}
                {notDiscardEffect && <button className="btn-primary" onClick={() => playerStateContext.cancelEffects()}>cancel effect</button>}
                {isActivePlayer && <button className="btn-primary" onClick={() => playerStateContext.handleEndRound()}>end of round</button>}
            </ButtonGroup>
            <div style={{display: "flex", flexFlow: "row", justifyContent: "space-evenly", marginLeft: "1vw"}}>
                {isActivePlayer ? <p>Your turn!&nbsp;</p> : <p>Wait for your turn...</p>}
                {playerStateContext.playerState.activeEffects.length > 0 && " | " + playerStateContext.playerState.activeEffects[0]}
            </div>
        </div>
    )
};
