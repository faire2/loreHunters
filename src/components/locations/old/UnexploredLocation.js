import React, {useContext} from "react";
import {BoardStateContext} from "../../../Contexts";
import {LOCATION_TYPE} from "../../functions/lists";

export default function ExploredLocation(props) {
    const boardStateContext = useContext(BoardStateContext);
    let location = props.location;
    location.state = props.state;



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

            <div><div style={containerStyle}
                      onClick={() => boardStateContext.handleClickOnLocation(location.effects, location, props.line)}>
                <div>{props.level}</div>
                <div style={effectsStyle}>{{/*exploreCost*/}}</div>
                <svg width={locationRadius * 2.01} height={locationRadius * 2.01} style={svgStyle}>
                    <circle cx={locationRadius} cy={locationRadius} r={locationRadius} fill={fillColor}/>
                    <rect x={locationRadius - 0.5 * levelRectSide} y={0.1 * locationRadius} width={levelRectSide}
                          height={levelRectSide} fill={tokenFillColor} rx="3" ry="3"/>
                </svg>
            </div>
        </div>
    )
}