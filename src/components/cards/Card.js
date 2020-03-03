import React from 'react';

import bgrItemEmpty from "../../img/cardBackgrounds/ItemBrownEmpty3.png"
import bgrWalk from "../../img/cardBackgrounds/ItemBrownWalk3.png"
import bgrJeep from "../../img/cardBackgrounds/ItemBrownJeep3.png"
import bgrShip from "../../img/cardBackgrounds/ItemBrownShip3.png"
import bgrPlane from "../../img/cardBackgrounds/ItemBrownPlane3.png"


export default function Card(props) {
    const card = props.card;

    const styles = {
        width: 142,
        height: 200,
        margin: 5,
        position: "relative",
        backgroundImage: `url(${card.background}`,
        backgroundSize: "cover"
    };

    console.log("Displaying card:" + card.cardName);

    return (
        <div style={styles} className="card">
            <Movement movement={card.movement}/>
            <h2>{card.cardName}</h2>
            <Effects effects={card.effects}/>
            <AlternativeEffects effects={card.effects2} />
            <Cost cost={card.cost}/>
            <VictoryPoints points={card.points}/>
        </div>
    )
}

const Movement = (props) =>
    <div className="Movement">
        {props.movement}
    </div>;

const Effects = (props) =>
    <div className="Effects">
        {props.effects}
    </div>;

const AlternativeEffects = (props) =>
    <div className="Effects2">
        {props.effects}
    </div>;

const Cost = (props) =>
        <div className="Cost">
            <h3>{props.cost}</h3>
        </div>;

const VictoryPoints = (props) =>
    <div className="VictoryPoints">
        <h3>{props.points}</h3>
    </div>;


export const BACKGROUNDS = Object.freeze({
    itemEmpty: bgrItemEmpty,
    itemWalk: bgrWalk,
    itemJeep: bgrJeep,
    itemShip: bgrShip,
    itemPlane: bgrPlane
});