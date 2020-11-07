import React from "react";
import {Field} from "./tiles/Field";
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

    const columns = legend.fields.map((column, i) =>
        <div style={columnStyle} key={"column" + i}>
            {column.map((field, y) =>
                <div key={y}>
                    <Field height={field.size} field={field} positions={legend.positions} columnIndex={i} fieldIndex={y}
                           legendIndex={props.legendIndex} store={props.store}/>
                </div>
            )}
            <ColunmRewards columnRewards={legend.columnRewards[i]} firstTokenPoints={legend.victoryPoints.firstToken[i]}
                secondTokenPoints={legend.victoryPoints.secondToken[i]}/>
        </div>
    );

    return (
        <div style={containerStyle}>
            {columns}
        </div>
    )
}