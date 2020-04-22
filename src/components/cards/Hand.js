import Card from "./Card";
import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";

export function Hand() {
    const playerStateContext = useContext(PlayerStateContext);

    return (
        <div className="d-flex flex-row position-relative">
            {playerStateContext.playerState.hand.map((card, i) =>
                <div key={i} >
                    <Card card={card} index={i}/>
                </div>
            )}
        </div>
    )
}