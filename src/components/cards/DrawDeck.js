import React from "react";

export const DrawDeck = (props) => {
    const containerStyle = {
        width: "5vw",
        height: "9vw",
        display: "flex",
        justifyContent: "center",
    }

    return (
        <div style={containerStyle}>
            {props.cards.map((card, i) => {
                const margin = 5 + i * 10;
                return (
                    <div style={{position: "absolute", marginTop: margin, width: "5vw",}}>
                        <svg width="100%" viewBox="0 0 120 120">
                            <rect width="120" height="80" rx="15" ry="15" fill="green" stroke="yellow" strokeWidth="5"/>
                        </svg>
                    </div>)
            })}
        </div>)
};