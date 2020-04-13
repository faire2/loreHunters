import React, {useState} from "react";
import {LegendsArea} from "../legends/LegendsArea";
import Store from "../store/Store";

export default function TopSlidingPanel() {
    const [extendRightPanel, setExtendRightPanel] = useState(false);
    const [buttonOnHover, setButtonOnHover] = useState(false);

    const slideStyle = {
        position: "fixed",
        top: 0,
        right: 0,
        width: "100vw",
        height: extendRightPanel ? "23vw" : "1.5vw",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
    };

    const sliderButtonStyle = {
        position: "absolute",
        bottom: "0",
        right: "3vw",
        backgroundColor: "#74a69f",
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "8px solid",
        borderColor: buttonOnHover ? "#003557" : "#0065A6",
        outline: "none",
        transition: "all .2s cubic-bezier(0, 1.26, .8, 1.28)",
        cursor: "pointer",
        transform: buttonOnHover ? "scale(1.2, 1.2)" : "none",
        zIndex: 2,
    };

    return (
        <div style={slideStyle} className="d-flex flex-row">
            <button style={sliderButtonStyle} onMouseEnter={() => setButtonOnHover(!buttonOnHover)}
                    onMouseLeave={() => setButtonOnHover(!buttonOnHover)}
                    onClick={() => setExtendRightPanel(!extendRightPanel)}/>
            <LegendsArea/>
        </div>
    )
}