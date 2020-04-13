import React, {useContext} from 'react';
import {Legends} from "../../data/legends";
import {AdventurerToken} from "../Symbols";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";
import {processEffects} from "../functions/processEffects";
import {BoardStateContext} from "../../Contexts";

export function Legend(props) {
    const idLegend = props.legend;
    const jsxLegend = Legends[idLegend.id];
    const legendIndex = props.legendIndex;
    const legends = props.legends;

    const boardStateContext = useContext(BoardStateContext);
    const playerIndex = boardStateContext.playerIndex;

    const containerStyle = {
        position: "relative",
    };

    const fieldStyle = {
        position: "relative",
        width: "120vw",
        height: "10vw",
        zIndex: 3,
        marginTop: "-10.5vw",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginRight: "3.5vw",
    };

    const adventurerSize = {
        marginTop: "1vw",
        width: "1.9vw",
    }

    function handleOnClickField(i) {
        console.log(jsxLegend.effects[i]);
        // check that it is first field or that player has adventurer token on previous field
        if (boardStateContext.playerState.actions > 0) {
            if (i === 0 || legends[legendIndex].positions[playerIndex] === i - 1) {
                let effectsResult = processEffects(null, null, boardStateContext.playerState, jsxLegend.effects[i],
                    null, boardStateContext.store, null, boardStateContext.locations, jsxLegend);
                if (effectsResult.processedAllEffects) {
                    if (legends[legendIndex].positions[playerIndex] !== null) {
                        legends[legendIndex].positions[playerIndex] += 1;
                    } else {
                        legends[legendIndex].positions[playerIndex] = 0;
                    }
                    effectsResult.tPlayerState.actions = effectsResult.tPlayerState.actions -= 1;
                    boardStateContext.setLegends(legends);
                    boardStateContext.handleClickOnLegend(effectsResult);
                }
            }
        }
    }

    // invisible arrays that serve as clickable zones over individual fields of the legend
    const divArray = [];
    for (let i = 0; i < 7; i++) {
        let adventurersArray = [];

        // if any player's position is equal do this legend position, add his adventurer token
        for (let x = 0; x < GLOBAL_VARS.numOfPlayers; x++) {
            if (legends[legendIndex].positions[x] === i) {
                adventurersArray.push(<AdventurerToken color={GLOBAL_VARS.playerColors[x]}/>);
            }
        }

        // push either empty clickable div or clickable div with relevant tokens
        divArray.push(
            <div style={fieldStyle} onClick={() => handleOnClickField(i)}>{adventurersArray.map((adv, i) =>
                <div style={adventurerSize} key={i}>{adv}</div>
            )}</div>)
    }

    return (
        <div style={containerStyle}>
            <div style={{position: "relative"}}>
                {jsxLegend.graphic}
                <div className="d-flex flex-row">
                    {divArray.map((div, i) =>
                        div
                    )}
                </div>
            </div>
        </div>
    )
}