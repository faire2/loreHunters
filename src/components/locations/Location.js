import React, {useContext} from "react";
import {AdventurerToken} from "../Symbols";
import {BoardStateContext} from "../../Contexts";
import {
    BgrBasic,
    BgrBasicDouble,
    BgrBrown2,
    BgrBrown3,
    BgrBrownUnexplored,
    BgrEmpty,
    BgrGreen2,
    BgrGreen3,
    BgrGreenUnexplored,
    BgrLostCity,
    Level2Symbol,
    Level3Symbol,
} from "./locationsImages";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../functions/enums";
import {GLOBAL_VARS} from "../../data/idLists";
import {getExplorationCost} from "./locationFunctions";
import {getJsxElement} from "../functions/getJsxElement";

export default function Location(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;
    location.state = props.idLocation.state;
    location.line = props.idLocation.line;
    location.index = props.idLocation.index;
    location.owner = props.idLocation.owner;
    location.level = props.idLocation.level;
    location.type = props.idLocation.type;
    location.level = props.idLocation.level;

    /* transport icons for explored location*/
    /*const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }*/

    let locationBackground = null;
    let locationUnexploredBackground = null;

    const explorationCostStyle = {
        display: "flex",
        flexFlow: "row",
        fontSize: "1.3vw",
        marginTop: "3.8vw",
    };

    /* explore costs for unexplored location */
    let exploreCost = [];
    let exploreCostText = <div></div>;
    if ((location.type === LOCATION_TYPE.green || location.type === LOCATION_TYPE.brown) && location.state === LOCATION_STATE.unexplored) {
        exploreCost = getExplorationCost(location.type, location.level, false, null);
        exploreCostText =
            <div style={explorationCostStyle}>
                {exploreCost.map((effect, i) =>
                    <div key={i}>
                        {getJsxElement(effect)}
                    </div>
                )}
            </div>;
    }

    if (location.type === LOCATION_TYPE.brown) {
        if (location.level === LOCATION_LEVEL["2"]) {
            locationBackground = <BgrBrown2/>;
            locationUnexploredBackground = <BgrBrownUnexplored/>;
        } else if (location.level === LOCATION_LEVEL["3"]) {
            locationBackground = <BgrBrown3/>;
            locationUnexploredBackground = <BgrBrownUnexplored/>;
        }
    } else if (location.type === LOCATION_TYPE.green) {
        if (location.level === LOCATION_LEVEL["2"]) {
            locationBackground = <BgrGreen2/>;
            locationUnexploredBackground = <BgrGreenUnexplored/>;
        } else if (location.level === LOCATION_LEVEL["3"]) {
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
    } else if (location.type === LOCATION_TYPE.lostCity) {
        locationBackground = <BgrLostCity/>;
        locationUnexploredBackground = <BgrBrownUnexplored/>;
    } else if (location.type === LOCATION_TYPE.emptyBrownLocation || location.type === LOCATION_TYPE.emptyGreenLocation) {
        locationBackground = <BgrEmpty/>;
        locationUnexploredBackground = <BgrEmpty/>;
    } else {
        console.log("Unable to process location level or type in Location.js: " + location.id + " / " + location.type + " / " + location.level)
    }
    location.exploreCost = exploreCost;

    const levelSymbol = location.level === LOCATION_LEVEL["2"] ? <Level2Symbol/> : <Level3Symbol/>;

    const containerStyle = {
        width: "7vw",
        height: "4vw",
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
             onClick={() => boardStateContext.handleClickOnLocation(location)}>
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
