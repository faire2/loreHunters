import Card from "./Card";
import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {sideTextStyle} from "./CardRow";

export function Hand() {
    const playerStateContext = useContext(PlayerStateContext);
    const containerStyle = {
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap"
    }
    return (
        <div style={containerStyle}>
            <div style={sideTextStyle}>HAND</div>
            {playerStateContext.playerState.hand.map((card, i) =>
                <div key={i} >
                    <Card card={card} index={i}/>
                </div>
            )}
        </div>
    )
}