import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import {Locations} from "../../data/locations";
import Location from "./Location";
import map from "../../img/map.png"

export default function LocationsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const locations = boardStateContext.locations;

    const container = {
        marginTop: "3vw",
        height: "33vw",
    };

    const locationStyle = {
        marginTop: "-1.4vw",
    };

    const leftMargin = {
        marginLeft: "7.5vw",
    };

    const empty = {
        minWidth: 116,
    };

    const bgrImg = {
        position: "absolute",
        width: "80vw",
        height: "33vw",
        left: 0,
        zIndex: -1
    };

    const verticalCenter = {
        position: "absolute",
        top: "50%",
        height: "33vw",
        marginTop: "-17.5vw"
    }

    return (
        <div style={container}>
            <img src={map} style={bgrImg}/>
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
                                        <Location location={Locations[location.id]} idLocation={location}/>
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
                            <Location location={Locations[location.id]} idLocation={location}/>
                        </div>
                    )}
                </div>
                <div style={leftMargin}>
                    <div style={locationStyle} className="d-flex flex-row position-relative">
                        {locations !== null && locations.line2.map((location, i) =>
                            <div key={"locationLine1-" + i}>
                                <Location location={Locations[location.id]} idLocation={location}/>
                            </div>
                        )}
                    </div>
                </div>
                <div style={locationStyle} className="d-flex flex-row position-relative">
                    {locations !== null && locations.line1.map((location, i) =>
                        <div key={"locationLine1-" + i}>
                            <Location location={Locations[location.id]} idLocation={location}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}