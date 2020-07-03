import hexButton from "../../img/components/hexButton.png"
import hexButtonActive from "../../img/components/hexButtonActive.png"
import hexButtonInactive from "../../img/components/hexButtonInactive.png"
import React from "react";
import {BUTTON_STATE} from "../functions/enums";

export const HexButton = (props) => {
    const imgSrc = props.state === BUTTON_STATE.normal ?
        hexButton
        : props.state === BUTTON_STATE.active ?
            hexButtonActive
            : hexButtonInactive;

    const buttonStyle = {
        height: "0.7em",
        width: "0.63em",
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "contain",
        cursor: "pointer",
    };

    return (
        <div style={buttonStyle} onClick={() => props.onClickFunction(props.index)} />
    )
};