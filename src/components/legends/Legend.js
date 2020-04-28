import React from 'react';
import {Legends2} from "../../data/legends";
import {Field} from "./tiles/Field";
import victoryPoints from "../../img/symbols/VP.png";

export function Legend(props) {
    const idLegend = props.legend;
    const jsxLegend = Legends2[idLegend.id];

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

    return (
        <div style={containerStyle}>
            {columns}
        </div>
    )
}