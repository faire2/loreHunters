import React from "react"
import styled from "styled-components";

import resourceRelicBronze from "../../img/relics/RelicResourceBronze.png"
import resourceRelicSilver from "../../img/relics/RelicResourceSilver.png"
import resourceRelicGold from "../../img/relics/RelicResourceGold.png"
import {RELIC} from "../functions/enums";
import {JsxFromEffects} from "../JsxFromEffects";

export const RelicWithResource = props => {
    const width = props.width ? props.width : 2.2;
    const height = width * 1.2;
    const fontSize = props.fontSize ? props.fontSize : "2vw";
    if (!props.effects) {
        debugger
    }

    let backGround;
    if (props.relicType === RELIC.bronze) {
        backGround = resourceRelicBronze;
    } else if (props.relicType === RELIC.silver) {
        backGround = resourceRelicSilver;
    } else if (props.relicType === RELIC.gold) {
        backGround = resourceRelicGold
    }
    return (
        <Relic backGround={backGround} height={height + "vw"} width={width + "vw"}>
            <JsxFromEffects effectsArray={props.effects} fontSize={fontSize + "vw"}/>
        </Relic>
    )
}

const Relic = styled.div`
    background-image: url(${props => props.backGround});
    background-size: contain;
    height: ${props => props.height};
    width: ${props => props.width};
    display: flex;
    justify-content: center;
    padding-bottom: 1vw;
`;
