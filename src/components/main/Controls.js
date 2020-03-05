import React, {useContext} from 'react';
import {PlayerStateContext} from "../../Contexts";

export const Controls = (props) => {
    const playerStateContext = useContext(PlayerStateContext);
    return (
        <div>
            <button className="btn-primary" onClick={() => playerStateContext.handleEndRound()}>next round</button>
        </div>
    )
};
