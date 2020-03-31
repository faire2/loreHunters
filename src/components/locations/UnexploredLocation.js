import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import {LOCATION_TYPE, LOCATIONS_EXPLORE_COST} from "../../data/locations";
import {LOCATION_LEVEL} from "../../data/idLists";

export default function ExploredLocation(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;
    let exploreCost = null;

    if (location.type === LOCATION_TYPE.brown) {
        if (props.level === LOCATION_LEVEL["2"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.brown2
        } else if (props.level === LOCATION_LEVEL["3"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.brown3
        }
    } else if (location.type === LOCATION_TYPE.green) {
        if (props.level === LOCATION_LEVEL["2"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.green2
        } else if (props.level === LOCATION_LEVEL["3"]) {
            exploreCost = LOCATIONS_EXPLORE_COST.green3
        }
    } else if (location.level === LOCATION_LEVEL["1"]) {
        exploreCost = null;
    } else {
        console.log ("Unable to determine exploration cost for location: " + location.id)
    }

    const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }

    /* initial colors are changed based on tLocation type */
    let fillColor = "#cdcdcd";
    let tokenFillColor = "#9f9f9f";
    // eslint-disable-next-line no-unused-vars
    let tokenStrokeColor = "#616161";

    /* svg element sizes */
    const locationRadius = 75;
    const levelRectSide = 30;

    switch (location.type) {
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
        default:
            console.log("Unknown tLocation type in component Location: ");
            console.log(location);
    }

    const containerStyle = {
        minWidth: locationRadius * 2,
        position: "relative",
        textAlign: "center",
        margin: 5,
        cursor: "pointer",
    };

    const effectsStyle = {
        marginTop: "11%",
        display: "block",
        maxWidth: 150,
    };

    const svgStyle = {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: -1,
    };

    return (
        <div style={containerStyle}
             onClick={() => boardStateContext.handleClickOnLocation(location.effects, location)}>
            <div>
                <div>{props.level}</div>
                <div style={effectsStyle}>{exploreCost}</div>
                <svg width={locationRadius * 2.01} height={locationRadius * 2.01} style={svgStyle}>
                    <circle cx={locationRadius} cy={locationRadius} r={locationRadius} fill={fillColor}/>
                    <rect x={locationRadius - 0.5 * levelRectSide} y={0.1 * locationRadius} width={levelRectSide}
                          height={levelRectSide} fill={tokenFillColor} rx="3" ry="3"/>
                </svg>
            </div>
            <span style={{fontSize: 10}}> {location.state} </span>
        </div>
    )
}