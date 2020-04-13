import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {Legend} from "./Legend";

export function LegendsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const legends = boardStateContext.legends;

    const style = {
        position: "absolute",
        bottom: 0,
        zIndex: 0,
        height: "20vw",
        width: "80vw",
        right: 0,
        left: 0,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "8vw"
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