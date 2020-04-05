import React, {useState} from "react";

export default function TopSlidingPanel() {
    const [extendRightPanel, setExtendRightPanel] = useState(false);
    const [buttonOnHover, setButtonOnHover] = useState(false);

    const slideStyle = {
        position: "fixed",
        left: 0,
        top: 0,
        height: extendRightPanel ? "27vw" : "7vw",
        width: "100vh",
        zIndex: 1,
        backgroundColor: "none",
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
    };

    const buttonStyle = {
      position: "absolute",
        bottom: "2.5vh",
        right: "1vw",
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
    };

    return(
        <div style={slideStyle}>
            <button style={buttonStyle} onMouseEnter={() => setButtonOnHover(!buttonOnHover)}
                    onMouseLeave={() => setButtonOnHover(!buttonOnHover)} onClick={() => setExtendRightPanel(!extendRightPanel)}/>
        </div>
    )
}