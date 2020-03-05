import React from "react";
import Card from "./Card";

export const DiscardDeck = (props) => {
    return (
    props.cards.map((card, i) => {
        const margin = 5 + i * 10;
        return (
            <div className="align-middle" key={i}>
                <div style={{position: "absolute", marginLeft: margin, marginTop: 5}}>
                    <Card card={card} index={i} />
                </div>
            </div>)
    }))
};