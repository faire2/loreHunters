import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {Field} from "./tiles/Field";
import {Legend} from "./Legend";

export function LegendsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const legends = boardStateContext.legends;

    const style = {
        position: "absolute",
        top: 0,
        marginLeft: "47vw",
        zIndex: 0,
        height: "20vw",
        width: "80vw",
        marginBottom: "3vw",
    };

    return (
        <div style={style}>
            {legends && legends.map((legend, i) =>
                <div key={"legend" + i}>
                    <Legend legend={legend} legends={legends} legendIndex={i} />
                </div>
            )}
        </div>
    )
}