import {getJsxSymbol} from "../functions/getJsxSymbol";
import React from "react";

export const LocationEffects = (props) => {
const effectsTextStyle = {
    top: "2.2vw",
    height: "2vw",
    fontSize: "1.4vw",
    right: 0,
    left: 0,
    margin: "auto",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

/* effects text for explored location */
   return (
    <div style={effectsTextStyle}>
        {props.effects.map((effect, i) =>
            <div key={i}>
                {getJsxSymbol(effect)}
            </div>
        )}
    </div>
)};