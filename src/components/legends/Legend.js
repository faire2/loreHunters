import React, {useState} from 'react';
import {Legends} from "../../data/legends";
import {processEffects} from "../functions/processEffects";

export function Legend(props) {
    const [playerPositions, setPlayerPositions] = useState([]);
    const serverLegend = props.legend;
    const jsxLegend = Legends[serverLegend.id];

    const containerStyle = {
        position: "relative",
        backgroundColor: "red",
    };

    const fieldStyle = {
        width: "14.29%",
        zIndex: 3,
        height: "10vw",
        marginTop: "-10.5vw",
        cursor: "pointer",
    };

    function handleOnClickField(i) {
        console.log(jsxLegend.effects[i]);
        //todo overit na resultu, ze zaplatil, pak posunout v lokaci
        processEffects();
    }

    // invisible arrays that serve as clickable zones over individual fields of the legend
    const divArray = [];
    for (let i = 0; i < 7; i++) {
        divArray.push(<div style={fieldStyle} onClick={() => handleOnClickField(i)}></div>)
    }

    return (
        <div style={containerStyle}>
            <div style={{position: "relative"}}>
                {jsxLegend.graphic}
                <div className="d-flex flex-row">
                    {divArray.map((div, i) =>
                        div
                    )}
                </div>
            </div>

        </div>
    )
};