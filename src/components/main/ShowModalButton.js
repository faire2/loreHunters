import React, {useState} from "react";

export const ShowModalButton = props => {
    const [buttonOnHover, setButtonOnHover] = useState(false);

    const sliderButtonStyle = {
        position: "absolute",
        bottom: 0,
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
        <div>
            <button style={sliderButtonStyle} onMouseEnter={() => setButtonOnHover(!buttonOnHover)}
                    onMouseLeave={() => setButtonOnHover(!buttonOnHover)}
                    onClick={() => props.showModal(true)}/>
        </div>
    )
}