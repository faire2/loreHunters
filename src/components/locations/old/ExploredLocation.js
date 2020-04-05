import React, {useContext, useState} from "react";
import {AdventurerToken} from "../../Symbols";
import {BoardStateContext} from "../../../Contexts";
import {LOCATION_STATE, LOCATION_TYPE} from "../../../data/idLists";
import {GLOBAL_VARS} from "../../functions/initialStateFunctions";

export default function ExploredLocation(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;
    const playerOwner = null;
    location.state = props.state;

    const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }

    /* initial colors are changed based on tLocation type */
    let fillColor = "#cdcdcd";
    let tokenFillColor = "#9f9f9f";
    let tokenStrokeColor = "#616161";

    /* svg element sizes */
    const locationRadius = 75;
    const tokenRadius = 30;
    const tokenStrokeWidth = 1;
    const levelRectSide = 30;

    switch (props.type) {
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
        marginTop: "2%",
    };

    const svgStyle = {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: -1,
    };

    const adventurerStyle = {
        marginTop: 10,
    };

    function handleClickOnExploredLocation() {
        if (location.state === LOCATION_STATE.explored) {
            boardStateContext.handleClickOnLocation(location.effects, location, props.line)
        }
    }

    return (
        <div style={containerStyle}
             onClick={() => handleClickOnExploredLocation()}>
            <div>
                <div>{props.level}</div>
                <div style={effectsStyle}>{location.effectsText}</div>
                <svg width={locationRadius * 2.01} height={locationRadius * 2.01} style={svgStyle}>
                    <circle cx={locationRadius} cy={locationRadius} r={locationRadius} fill={fillColor}/>
                    <rect x={locationRadius - 0.5 * levelRectSide} y={0.1 * locationRadius} width={levelRectSide}
                          height={levelRectSide} fill={tokenFillColor} rx="3" ry="3"/>
                    <circle cx={locationRadius} cy={locationRadius + 0.55 * locationRadius} r={tokenRadius}
                            fill={tokenFillColor} stroke={tokenStrokeColor} strokeWidth={tokenStrokeWidth}/>
                </svg>
                <div style={adventurerStyle}>
                    {props.state === LOCATION_STATE.explored ? transportIcons : <AdventurerToken color={GLOBAL_VARS.playerColors[playerOwner]} />}
                </div>
            </div>
        </div>
    )
}