import {shuffleArray} from "../functions/initialStates/initialStateFunctions";
import React from "react";
import Card from "./Card";

export const CardRow = (props) => {
    const cards = !props.randomize ? props.cards : shuffleArray(props.cards);
    return (
        <div style={cardRowStyle}>
            <div style={sideTextStyle}>{props.text}</div>
            {cards.map((card, i) =>
                <div key={i}>
                    <Card card={card} index={i}/>
                </div>)}
        </div>
    )
}

export const cardRowStyle = {
    marginTop: "0.5vw",
    position: "relative",
    marginLeft: "1.7vw",
    display: "flex",
    flexFlow: "row",
    minHeight: "9vw",
    flexWrap: "wrap",
}

export const sideTextStyle = {
    writingMode: "vertical-rl",
}