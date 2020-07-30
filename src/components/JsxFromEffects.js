import {getJsxSymbol} from "./functions/getJsxSymbol";
import React from "react";

export const JsxFromEffects = (props) => {
    const effectsStyle = {
        fontSize: props.fontSize,
        display: "flex",
        flexFlow: "row",
        alignItems: "center"
    };

    return (
        <div style={effectsStyle}>
            {props.effectsArray.map((effect, i) =>
                <div key={i}>
                    {getJsxSymbol(effect)}
                </div>
            )}
        </div>
    )
};