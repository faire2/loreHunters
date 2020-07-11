import React from "react";
import {JsxFromEffects} from "../../JsxFromEffects";
import {STYLE} from "../../functions/enums";

export const ColunmRewards = (props) => {
    const firstTokenStyle = {

    };

    const secondTokenStyle = {

    }


    return (
        <div style={STYLE.row}>
            <div>
                <JsxFromEffects effectsArray={props.columnRewards.firstToken} fontSize={"2vw"}/>
            </div>
            <div>
                <JsxFromEffects effectsArray={props.columnRewards.secondToken} fontSize={"2vw"}/>
            </div>
        </div>
    )
}