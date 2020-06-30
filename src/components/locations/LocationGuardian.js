import {getJsxSymbol} from "../functions/getJsxSymbol";
import React from "react";
import GuardianTemplate from "../../img/gardianImages/guardianplaceholder.png"

export const LocationGuardian = (props) => {
    const guardian = props.guardian;
    const guardianId = guardian.id;

    const effectsStyle = {
        top: "0.6vw",
        left: "-0.1vw",
        fontSize: "0.9vw",
        height: "2vw",
        position: "absolute",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const imageStyle = {
        position: "absolute",
        width: "100%",
        left: 0,
        top: "-0.25vw",
    };

    return (
        <div>
            <div style={imageStyle}>
                <img src={GuardianTemplate} alt={{guardianId}} style={imageStyle}/>
            </div>
            <div style={effectsStyle}>
                {guardian.effects.map((effect, i) =>
                    <div key={i}>
                        {getJsxSymbol(effect)}
                    </div>
                )}
            </div>
        </div>
    )
};