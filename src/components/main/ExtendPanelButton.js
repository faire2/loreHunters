import React, {useState} from "react";

export const ExtendPanelButton = props => {
    const [buttonOnHover, setButtonOnHover] = useState(false);
    const [buttonExtended, setButtonExtended] = useState(false)

    const sliderButtonStyle = {
        position: "absolute",
        bottom: !buttonExtended ? 0 : "28vw",
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

    function handleOnClick() {
        setButtonExtended(!buttonExtended);
        props.setExtendPanel(!props.extendPanel);
    }

    return (
        <div>
            <button style={sliderButtonStyle} onMouseEnter={() => setButtonOnHover(!buttonOnHover)}
                    onMouseLeave={() => setButtonOnHover(!buttonOnHover)}
                    onClick={() => handleOnClick()}/>
        </div>
    )
}