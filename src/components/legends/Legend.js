import React, {useContext} from 'react';
import {LEGENDS} from "../../data/legends";
import {BoardStateContext} from "../../Contexts";
import {Field} from "./tiles/Field";
import victoryPoints from "../../img/symbols/VP.png";

export function Legend(props) {
    const idLegend = props.legend;
    const jsxLegend = LEGENDS[idLegend.id];

    const boardStateContext = useContext(BoardStateContext);

    const containerStyle = {
        position: "relative",
        display: "flex",
        flexFlow: "row",
        marginLeft: "0.5vw",
    };

    const columnStyle = {
        marginRight: "0.5vw"
    }

    const victoryPointsStyle = {
        backgroundImage: `url(${victoryPoints}`,
        width: "2vw",
        height: "2vw",
        marginLeft: "-0.5vw",
        fontSize: "1.2vw",
        color: "white",
        backgroundSize: "100% 100%",
        position: "absolute",
        zIndex: 1
    }

    const VictoryPoints = (props) =>
        <div style={victoryPointsStyle}>
            {props.points}
        </div>

    const columns = jsxLegend.fields.map((column, i) =>
        <div style={columnStyle} key={"column" + i}>
            <VictoryPoints points={jsxLegend.victoryPoints[i]}/>
            {column.map((field, y) =>
                <div key={y}>
                    <Field height={field.size} field={field} positions={idLegend.positions} columnIndex={i} fieldIndex={y}
                        legendIndex={props.legendIndex}/>
                </div>
            )}
        </div>
    );

    const adventurerSize = {
        marginTop: "1vw",
        width: "1.9vw",
    }

    function handleOnClickField(i) {
        boardStateContext.handleClickOnLegend(i);
    }

    return (
        <div style={containerStyle}>
            {columns}
        </div>
    )
}