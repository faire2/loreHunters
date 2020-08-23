import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {Legend} from "./Legend";

export function LegendArea() {
    const boardStateContext = useContext(BoardStateContext);
    const legend = boardStateContext.legend;
    const store = boardStateContext.store;

    const containerStyle = {
        position: "absolute",
        top: 0,
        marginLeft: "47vw",
        zIndex: 0,
        height: "23vw",
        width: "80vw",
        marginBottom: "1vw",
    };


    return (
        <div style={containerStyle}>
            <Legend legend={legend} store={store}/>
        </div>
    )
}