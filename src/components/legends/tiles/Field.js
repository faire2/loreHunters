import React, {useContext} from "react";
import block1 from "../../../img/legends/blok1.png"
import block2 from "../../../img/legends/blok2.png"
import block3 from "../../../img/legends/blok3.png"
import {FIELD_SIZE} from "../../../data/legends2"
import {AdventurerToken} from "../../Symbols";
import {GLOBAL_VARS} from "../../functions/initialStateFunctions";
import {BoardStateContext} from "../../../Contexts";
import {EFFECT} from "../../../data/effects";

export const Field = (props) => {
    const columnHeight = props.height;
    const columnIndex = props.columnIndex;
    const fieldIndex = props.fieldIndex;
    const positions = props.positions;
    const boardStateContext = useContext(BoardStateContext);
    const legend = {...boardStateContext.legends[props.legendIndex]};

    // how many times has the field been entered and used
    let usage = legend.usage[columnIndex][fieldIndex]

    let effectsTextArr = props.field.effectsText;
    let effectsArr = props.field.effects;
    if ((usage > 0 && GLOBAL_VARS.numOfPlayers < 4) || (GLOBAL_VARS.numOfPlayers === 4 && usage > 1)) {
        if (effectsArr[0] === EFFECT.firstGainsExplore || effectsArr[0] === EFFECT.firstGainsCoin) {
            effectsTextArr.splice(0, 1);
            effectsArr.splice(0, 1);
        }
    }

    // set background and element height
    let background = null;
    let height = null;
    switch (columnHeight) {
        case FIELD_SIZE["1"]:
            background = block1;
            height = "6vw";
            break;
        case FIELD_SIZE["2"]:
            background = block2;
            height = "12.5vw";
            break;
        case FIELD_SIZE["3"]:
            background = block3;
            height = "19vw";
            break;
        default:
            console.log("Unable to process COLUMN_HEIGHT at Column: " + columnHeight);
    }

    const containerStyle = {
        position: "relative",
        width: "5vw",
        marginBottom: "0.5vw",
        backgroundImage: `url(${background}`,
        backgroundSize: "100% 100%",
        height: `${height}`,
    }

    const effectsTextStyle = {
        fontSize: "2vw",
        marginLeft: "0.3vw",
    }

    const costTextStyle = {
        position: "absolute",
        fontSize: "1.6vw",
        bottom: "0.1vw",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        width: "100%",
        marginLeft: "0.3vw"
    }

    const adventurerStyle = {
        position: "relative",
        width: "1.5vw",
        zIndex: "1"
    }

    const adventurerContainer = {
        marginLeft: "0.3vw",
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }

    const effectsText =
        <div style={effectsTextStyle}>
            {effectsTextArr.map((effect, i) =>
                effect
            )}
        </div>

    const costText =
        <div style={costTextStyle}>
            {props.field.costText.map((effect, i) =>
                <div style={{marginLeft: "-0.4vw"}} key={i}>
                    {effect}
                </div>
            )}
        </div>

    // if any player's position is equal do this legend position, add his adventurer token
    const adventurersArray = [];
    for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
        const playersPositions = positions[i];
        for (let position of playersPositions) {
            if (position.columnIndex === columnIndex && position.fieldIndex === fieldIndex) {
                adventurersArray.push(<AdventurerToken color={GLOBAL_VARS.playerColors[i]}/>);
            }
        }
    }

    function handleClickOnField() {
        let tLegends = boardStateContext.handleClickOnLegend(props.legendIndex, columnIndex, fieldIndex, effectsArr);
        if (tLegends) {
            legend.usage[columnIndex][fieldIndex] = usage + 1;
            tLegends[props.legendIndex].usage[columnIndex][fieldIndex] += 1;
            boardStateContext.setLegends(tLegends);
        }
    }

    return (
        <div style={containerStyle} onClick={() => handleClickOnField()}>
            <div style={adventurerContainer}>
                {adventurersArray.map(adventurer =>
                    <div style={adventurerStyle}>
                        {adventurer}
                    </div>
                )}
            </div>
            {effectsText}
            {costText}
        </div>
    )
}