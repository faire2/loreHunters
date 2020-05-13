import React, {useContext} from "react";
import {AdventurerToken, Coin, Explore, Jeep, Ship} from "../Symbols";
import {BoardStateContext} from "../../Contexts";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../../data/idLists";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";
import {
    BgrBasic,
    BgrBasicDouble,
    BgrBrown2,
    BgrBrown3, BgrBrownUnexplored,
    BgrGreen2,
    BgrGreen3, BgrGreenUnexplored, Level2Symbol, Level3Symbol,
} from "./locationsImages";
import {EFFECT} from "../../data/effects";

export default function Location(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;
    location.state = props.idLocation.state;
    location.line = props.idLocation.line;
    location.owner = props.idLocation.owner;
    location.level = props.idLocation.level;
    location.type = props.idLocation.type;
    location.level = props.idLocation.level;

    /* transport icons for explored location*/
    /*const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }*/

    /* explore costs for unexplored location */
    let exploreCost = null;
    let exploreCostText = null;
    let locationBackground = null;
    let locationUnexploredBackground = null;

    const explorationCostStyle = {
        display: "flex",
        flexFlow: "row",
        fontSize: "1.3vw",
        marginTop: "4vw",
    };

    if (location.type === LOCATION_TYPE.brown) {
        if (location.level === LOCATION_LEVEL["2"]) {
            exploreCost = [EFFECT.loseJeep, EFFECT.loseCoin, EFFECT.loseExplore, EFFECT.loseExplore];
            exploreCostText = <div style={explorationCostStyle}><Jeep/><Coin/><Explore/><Explore/></div>;
            locationBackground = <BgrBrown2/>;
            locationUnexploredBackground = <BgrBrownUnexplored/>;
        } else if (location.level === LOCATION_LEVEL["3"]) {
            exploreCost = [EFFECT.loseJeep, EFFECT.loseCoin, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            exploreCostText = <div style={explorationCostStyle}><Jeep/><Coin/><Explore/><Explore/><Explore/></div>;
            locationBackground = <BgrBrown3/>;
            locationUnexploredBackground = <BgrBrownUnexplored/>;
        }
    } else if (location.type === LOCATION_TYPE.green) {
        if (location.level === LOCATION_LEVEL["2"]) {
            exploreCost = [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            exploreCostText = <div style={explorationCostStyle}><Ship/><Explore/><Explore/><Explore/></div>;
            locationBackground = <BgrGreen2/>;
            locationUnexploredBackground = <BgrGreenUnexplored/>;
        } else if (location.level === LOCATION_LEVEL["3"]) {
            exploreCost = [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            exploreCostText = <div style={explorationCostStyle}><Ship/><Explore/><Explore/><Explore/><Explore/></div>;
            locationBackground = <BgrGreen3/>;
            locationUnexploredBackground = <BgrGreenUnexplored/>
        }
    } else if (location.type === LOCATION_TYPE.basic) {
        /*exploreCostText = null;*/
        if (location.id === "5") {
            locationBackground = <BgrBasicDouble/>
        } else {
            locationBackground = <BgrBasic/>
        }
    } else {
        console.log("Unable to process location level or type in Location.js: " + location.id + " / " + location.type + " / " + location.level)
    }
    location.exploreCost = exploreCost;

    const levelSymbol = location.level === LOCATION_LEVEL["2"] ? <Level2Symbol/> : <Level3Symbol/>;

    const containerStyle = {
        width: "7vw",
        position: "relative",
        textAlign: "center",
        marginRight: "0.5vw",
    };

    const levelSymbolStyle = {
        position: "absolute",
        marginTop: "-0.1vw",
        fontSize: "0.6vw",
        width: "100%",
    };

    const effectsStyle = {
        top: "0.5vw",
        height: "2vw",
        fontSize: "1.8vw",
        right: 0,
        left: 0,
        margin: "auto",
        position: "absolute",
        cursor: "pointer",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const adventurerStyle = {
        width: "1.5vw",
        top: "2vw",
        right: 0,
        left: 0,
        margin: "auto",
        position: "absolute",
        cursor: "pointer",
        zIndex: 2,
        display: "inline-block",
    };


    return (
        <div style={containerStyle}
             onClick={() => boardStateContext.handleClickOnLocation(location.effects, location.exploreCost, location, props.idLocation.line)}>
            {location.state === LOCATION_STATE.unexplored && <div style={levelSymbolStyle}>{levelSymbol}</div>}
            {location.state === LOCATION_STATE.unexplored ? locationUnexploredBackground : locationBackground}
            <div style={effectsStyle}>
                {location.state === LOCATION_STATE.unexplored ? exploreCostText : location.effectsText}
            </div>
            {props.idLocation.state === LOCATION_STATE.occupied &&
            <AdventurerToken color={GLOBAL_VARS.playerColors[props.idLocation.owner]} style={adventurerStyle}/>}
        </div>
    )
}
