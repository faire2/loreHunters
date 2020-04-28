import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import {LOCATIONS} from "../../data/locations";
import Location from "./Location";
import map from "../../img/map.png"

export default function LocationsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const locations = boardStateContext.locations;

    const container = {
        position: "relative",
        width: "47vw",
        height: "19vw",
        backgroundImage: `url(${map}`,
        backgroundSize: "fill",
    };

    const locationStyle = {
        marginTop: "-0.1vw",
        marginLeft: "0.5vw"
    };

    const leftMargin = {
        marginLeft: "3.8vw",
    };

    const empty = {
        minWidth: 116,
    };
    const allLinesPresent = locations !== null && locations.line4.length > 0;
    const verticalCenter = {
        position: "absolute",
        marginTop: allLinesPresent > 0 ? "0.5vw" : "3vw",
    }

    return (
        <div style={container}>
            <div style={verticalCenter}>
                <div style={leftMargin}>
                    <div style={locationStyle} className="d-flex flex-row position-relative">
                        <br/>
                        {locations !== null && locations.line4.map((location, i) => {
                            if (location === "empty") {
                                return <div key={"empty" + i} style={empty}></div>
                            } else {
                                return (
                                    <div key={"locationLine1-" + i}>
                                        <Location location={LOCATIONS[location.id]} idLocation={location}/>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                </div>
                <div style={locationStyle} className="d-flex flex-row position-relative">
                    <br/>
                    {locations !== null && locations.line3.map((location, i) =>
                        <div key={"locationLine1-" + i}>
                            <Location location={LOCATIONS[location.id]} idLocation={location}/>
                        </div>
                    )}
                </div>
                <div style={leftMargin}>
                    <div style={locationStyle} className="d-flex flex-row position-relative">
                        {locations !== null && locations.line2.map((location, i) =>
                            <div key={"locationLine1-" + i}>
                                <Location location={LOCATIONS[location.id]} idLocation={location}/>
                            </div>
                        )}
                    </div>
                </div>
                <div style={locationStyle} className="d-flex flex-row position-relative">
                    {locations !== null && locations.line1.map((location, i) =>
                        <div key={"locationLine1-" + i}>
                            <Location location={LOCATIONS[location.id]} idLocation={location}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}