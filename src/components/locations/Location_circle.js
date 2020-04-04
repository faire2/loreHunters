import React, {useContext} from "react";
import {AdventurerToken} from "../Symbols";
import {BoardStateContext} from "../../Contexts";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../../data/idLists";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";
import {LOCATIONS_EXPLORE_COST} from "../../data/locations";

export default function Location(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;
    location.state = props.idLocation.state;
    const type = props.idLocation.type;
    const level = props.idLocation.level;

    /* transport icons for explored location*/
    const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }

    /* explore costs for unexplored location */
    let exploreCost = null;
    if (type === LOCATION_TYPE.brown) {
        if (level === LOCATION_LEVEL["2"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.brown2
        } else if (level === LOCATION_LEVEL["3"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.brown3
        }
    } else if (type === LOCATION_TYPE.green) {
        if (level === LOCATION_LEVEL["2"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.green2
        } else if (level === LOCATION_LEVEL["3"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.green3
        }
    } else if (location.level === LOCATION_LEVEL["1"]) {
        exploreCost = null;
    } else {
        console.log ("Unable to determine exploration cost for location: " + location.id)
    }

    /* initial colors are changed based on tLocation type */
    let fillColor = "#cdcdcd";
    let tokenFillColor = "#9f9f9f";
    let tokenStrokeColor = "#616161";

    /* svg element sizes */
    const locationRadius = 75;
    const levelRectSide = 30;
    const tokenRadius = 30;
    const tokenStrokeWidth = 1;

    switch (props.idLocation.type) {
        case LOCATION_TYPE.green:
            fillColor = "#90B13E";
            tokenFillColor = "#C3EF53";
            tokenStrokeColor = "#596D26";
            break;
        case LOCATION_TYPE.brown:
            fillColor = "#aa6a3d";
            tokenFillColor = "#ECB767";
            tokenStrokeColor = "#705731";
            break;
        case LOCATION_TYPE.mixed:
            fillColor = "#8d4646";
            tokenFillColor = "#ECB767";
            tokenStrokeColor = "#705731";
            break;
        default:
            console.log("Unknown tLocation type in component Location: ");
            console.log(location);
    }

    const containerStyle = {
        minWidth: locationRadius * 2,
        position: "relative",
        textAlign: "center",
        margin: 5,
    };

    const effectsStyle = {
        marginTop: location.state === LOCATION_STATE.unexplored ? "10%" : "2%",
        maxWidth: 150,
        cursor: "pointer",
    };

    const svgStyle = {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: -1,
    };

    const adventurerStyle = {
        marginTop: 10,
        maxWidth: 150,
    };


    return (
        <div style={containerStyle}
             onClick={() => boardStateContext.handleClickOnLocation(location.effects, location, props.idLocation.line)}>
            <div>
                <div>{props.idLocation.level}</div>
                <div style={effectsStyle}>{location.state === LOCATION_STATE.unexplored ? exploreCost : location.effectsText}</div>
                <svg width={locationRadius * 2.01} height={locationRadius * 2.01} style={svgStyle}>
                    <circle cx={locationRadius} cy={locationRadius} r={locationRadius} fill={fillColor}/>
                    <rect x={locationRadius - 0.5 * levelRectSide} y={0.1 * locationRadius} width={levelRectSide}
                          height={levelRectSide} fill={tokenFillColor} rx="3" ry="3"/>
                    {location.state !== LOCATION_STATE.unexplored &&
                        <circle cx={locationRadius} cy={locationRadius + 0.55 * locationRadius} r={tokenRadius}
                            fill={tokenFillColor} stroke={tokenStrokeColor} strokeWidth={tokenStrokeWidth}/>
                    }
                </svg>
                <div style={adventurerStyle}>
                    {props.idLocation.state === LOCATION_STATE.explored && transportIcons}
                    {props.idLocation.state === LOCATION_STATE.occupied && <AdventurerToken color={GLOBAL_VARS.playerColors[props.idLocation.owner]} />}
                </div>
            </div>
        </div>
    )
}