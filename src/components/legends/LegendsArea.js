import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {Legend} from "./Legend";

export function LegendsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const legends = boardStateContext.legends;

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
            {legends && legends.map((legend, i) =>
                <div key={"legend" + i}>
                    <Legend legend={legend} legends={legends} legendIndex={i}/>
                </div>
            )}
        </div>
    )
}