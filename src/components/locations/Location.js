import React, {useContext} from "react";
import {AdventurerToken} from "../Symbols";
import {BoardStateContext} from "../../Contexts";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../../data/idLists";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";
import {
    BgrBasic,
    BgrBasicDouble,
    BgrBrown2,
    BgrBrown2Unexplored,
    BgrBrown3,
    BgrBrown3Unexplored,
    BgrGreen2,
    BgrGreen2Unexplored,
    BgrGreen3,
    BgrGreen3Unexplored
} from "./locationsImages";

export default function Location(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;
    location.state = props.idLocation.state;
    location.line = props.idLocation.line;
    location.owner = props.idLocation.owner;
    const type = props.idLocation.type;
    const level = props.idLocation.level;

    /* transport icons for explored location*/
    /*const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }*/

    /* explore costs for unexplored location */
    let exploreCost = null;
    /*let exploreCostText = null;*/
    let locationBackground = null;
    let locationUnexploredBackground = null;

    if (type === LOCATION_TYPE.brown) {
        if (level === LOCATION_LEVEL["2"]) {
            exploreCost = {explore: 3, coins: 1};
            /*exploreCostText = <div className="effectsText"><Explore/><Explore/><Explore/><Coin/></div>;*/
            locationBackground = <BgrBrown2/>;
            locationUnexploredBackground = <BgrBrown2Unexplored/>;
        } else if (level === LOCATION_LEVEL["3"]) {
            exploreCost = {explore: 4, coins: 1};
            /*exploreCostText = <div className="effectsText"><Explore/><Explore/><Explore/><Explore/><Coin/></div>;*/
            locationBackground = <BgrBrown3/>;
            locationUnexploredBackground = <BgrBrown3Unexplored/>;
        }
    } else if (type === LOCATION_TYPE.green) {
        if (level === LOCATION_LEVEL["2"]) {
            exploreCost = {explore: 4, coins: 0};
            /*exploreCostText = <div className="effectsText"><Explore/><Explore/><Explore/><Explore/></div>;*/
            locationBackground = <BgrGreen2/>;
            locationUnexploredBackground = <BgrGreen2Unexplored/>;
        } else if (level === LOCATION_LEVEL["3"]) {
            exploreCost = {explore: 5, coins: 0};
            /*exploreCostText = <div className="effectsText"><Explore/><Explore/><Explore/><Explore/><Explore/></div>;*/
            locationBackground = <BgrGreen3/>;
            locationUnexploredBackground = <BgrGreen3Unexplored/>
        }
    } else if (type === LOCATION_TYPE.basic) {
        /*exploreCostText = null;*/
        if (location.id === "5") {
            locationBackground = <BgrBasicDouble/>
        } else {
            locationBackground = <BgrBasic/>
        }
    } else {
        console.log("Unable to process location level or type in Location.js: " + location.id + " / " + type + " / " + level)
    }
    location.exploreCost = exploreCost;

    const containerStyle = {
        /*minWidth: locationRadius * 2,*/
        width: "7vw",
        position: "relative",
        textAlign: "center",
        marginRight: "0.5vw",
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
             onClick={() => boardStateContext.handleClickOnLocation(location.effects, location, props.idLocation.line)}>
            {location.state === LOCATION_STATE.unexplored ? locationUnexploredBackground : locationBackground}
            <div style={effectsStyle}>
                {location.state === LOCATION_STATE.unexplored ? "" : location.effectsImage}
            </div>
            {props.idLocation.state === LOCATION_STATE.occupied &&
            <AdventurerToken color={GLOBAL_VARS.playerColors[props.idLocation.owner]} style={adventurerStyle}/>}
        </div>
    )
}