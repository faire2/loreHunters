import React from "react";

export const DrawDeck = (props) => {
    return (
    props.cards.map((card, i) => {
        const margin = 5 + i * 10;
        return (
            <div className="align-middle" key={i} >
                <div style={{position: "absolute", marginLeft: margin, marginTop: 5}}>
                    <svg width="142" height="200">
                        <rect width="142" height="200" rx="15" ry="15" fill="green" stroke="yellow" strokeWidth="5"/>
                    </svg>
                </div>
            </div>)
    }))
};