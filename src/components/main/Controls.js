import React, {useContext} from 'react';
import {PlayerStateContext} from "../../Contexts";

export const Controls = (props) => {
    const playerStateContext = useContext(PlayerStateContext);
    return (
        <div>
            <button className="btn-primary" onClick={() => playerStateContext.nextPlayer()}>next player</button>
            <button className="btn-primary" onClick={() => playerStateContext.handleEndRound()}>end of  round</button>
        </div>
    )
};
