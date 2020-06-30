import {getJsxSymbol} from "../functions/getJsxSymbol";
import React from "react";

export const ExplorationCost = (props) => {
    const effectsTextStyle = {
        top: "2.2vw",
        height: "2vw",
        fontSize: "1.3vw",
        right: 0,
        left: 0,
        margin: "auto",
        position: "absolute",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    return (
        <div style={effectsTextStyle}>
            {props.exploreCost.map((effect, i) => {
                const leftMargin = -i * 0.15 + "vw";
                return (
                    <div key={i} style={{marginLeft: leftMargin}}>
                        {getJsxSymbol(effect)}
                    </div>
                )
            })}
        </div>
    )
};