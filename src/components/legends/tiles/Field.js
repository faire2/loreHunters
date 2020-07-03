import React, {useContext} from "react";
import block1 from "../../../img/legends/blok1.png"
import block2 from "../../../img/legends/blok2.png"
import block3 from "../../../img/legends/blok3.png"
import lostCity from "../../../img/legends/lostCity.png"
import {FIELD_SIZE} from "../../../data/legends.mjs"
import {AdventurerToken} from "../../Symbols";
import {BoardStateContext} from "../../../Contexts";
import {GLOBAL_VARS} from "../../../data/idLists";
import {getJsxSymbol} from "../../functions/getJsxSymbol";

export const Field = (props) => {
    const columnHeight = props.height;
    const columnIndex = props.columnIndex;
    const fieldIndex = props.fieldIndex;
    const positions = props.positions;
    const boardStateContext = useContext(BoardStateContext);
    const numOfPlayers = boardStateContext.numOfPlayers;
    // how many times has the field been entered and used

    let effectsArr = props.field.effects;

    // set background and element height
    let background = null;
    let height = null;
    let width = null;
    switch (columnHeight) {
        case FIELD_SIZE["1"]:
            background = block1;
            height = "6vw";
            width = "5vw";
            break;
        case FIELD_SIZE["2"]:
            background = block2;
            height = "12.5vw";
            width = "5vw";
            break;
        case FIELD_SIZE["3"]:
            background = block3;
            height = "19vw";
            width = "5vw";
            break;
        case FIELD_SIZE.lostCity:
            background = lostCity;
            height = "19vw";
            width = "13vw";
            break;
        default:
            console.log("Unable to process COLUMN_HEIGHT at Column: " + columnHeight);
    }

    const containerStyle = {
        position: "relative",
        width: width,
        marginBottom: "0.5vw",
        backgroundImage: `url(${background}`,
        backgroundSize: "100% 100%",
        height: height,
    };

    const effectsTextStyle = {
        fontSize: "2vw",
        marginLeft: "0.3vw",
    };

    const costTextStyle = {
        position: "absolute",
        fontSize: "1.6vw",
        bottom: "0.1vw",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        width: "100%",
        marginLeft: "0.3vw"
    };

    const adventurerStyle = {
        position: "relative",
        width: "1.5vw",
        zIndex: "1"
    };

    const adventurerContainer = {
        marginLeft: "0.3vw",
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    };

    const effectsText =
        <div style={effectsTextStyle}>
            {effectsArr.map((effect, i) =>
                <div key={i}>
                    {getJsxSymbol(effect)}
                </div>
            )}
        </div>;

    const costText =
        <div style={costTextStyle}>
            {props.field.cost.map((effect, i) =>
                <div style={{marginLeft: "-0.4vw"}} key={i}>
                    {getJsxSymbol(effect)}
                </div>
            )}
        </div>;

    // if any player's position is equal do this legend position, add his adventurer token
    const adventurersArray = [];
    for (let i = 0; i < numOfPlayers; i++) {
        const playersPositions = positions[i];
        for (let position of playersPositions) {
            if (position.columnIndex === columnIndex && position.fieldIndex === fieldIndex) {
                adventurersArray.push(<AdventurerToken color={GLOBAL_VARS.playerColors[i]}/>);
            }
        }
    }

    function handleClickOnField() {
        boardStateContext.handleClickOnLegend(props.legendIndex, columnIndex, fieldIndex);
    }

    return (
        <div style={containerStyle} onClick={() => handleClickOnField()}>
            <div style={adventurerContainer}>
                {adventurersArray.map((adventurer, i) =>
                    <div style={adventurerStyle} key={i}>
                        {adventurer}
                    </div>
                )}
            </div>
            {effectsText}
            {costText}
        </div>
    )
};