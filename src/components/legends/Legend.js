import React from 'react';
import {Field} from "./tiles/Field";
import victoryPoints from "../../img/symbols/VP.png";
import {ColunmRewards} from "../assistantsChoice/ColumnRewards";

export function Legend(props) {
    const legend = props.legend;

    const containerStyle = {
        position: "relative",
        display: "flex",
        flexFlow: "row",
        marginLeft: "0.5vw",
    };

    const columnStyle = {
        marginRight: "0.5vw"
    };

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
    };

    const VictoryPoints = (props) =>
        <div style={victoryPointsStyle}>
            {props.points}
        </div>;

    const columns = legend.fields.map((column, i) =>
        <div style={columnStyle} key={"column" + i}>
            <VictoryPoints points={legend.victoryPoints[i]}/>
            {column.map((field, y) =>
                <div key={y}>
                    <Field height={field.size} field={field} positions={legend.positions} columnIndex={i} fieldIndex={y}
                           legendIndex={props.legendIndex}/>
                </div>
            )}
            <ColunmRewards columnRewards={legend.columnRewards[i]}/>
        </div>
    );

    return (
        <div style={containerStyle}>
            {columns}
        </div>
    )
}