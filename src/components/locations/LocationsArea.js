import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import {Locations} from "../../data/locations";
import Location from "./Location";

export default function LocationsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const locations = boardStateContext.locations;

    const marginTop = {
      marginTop: "3vw",
    };

    const style = {
        marginTop: "-3vw",
    };

    const leftMargin = {
        marginLeft: "7.5vw",
    };

    const empty = {
        minWidth: 116,
    };

    return (
        <div style={marginTop}>
            <div style={leftMargin}>
                <div style={style} className="d-flex flex-row position-relative">
                    <br/>
                    {locations !== null && locations.line4.map((location, i) => {
                        if (location === "empty") {
                            return <div key={"empty" + i} style={empty}></div>
                        } else {
                            return (
                                <div key={"locationLine1-" + i}>
                                    <Location location={Locations[location.id]} idLocation={location} />
                                </div>
                            )
                        }
                    })
                    }
                </div>
            </div>
            <div style={style} className="d-flex flex-row position-relative">
                <br/>
                {locations !== null && locations.line3.map((location, i) =>
                    <div key={"locationLine1-" + i}>
                        <Location location={Locations[location.id]} idLocation={location} />
                    </div>
                )}
            </div>
            <div style={leftMargin}>
                <div style={style} className="d-flex flex-row position-relative">
                    {locations !== null && locations.line2.map((location, i) =>
                        <div key={"locationLine1-" + i}>
                            <Location location={Locations[location.id]} idLocation={location} />
                        </div>
                    )}
                </div>
            </div>
            <div style={style} className="d-flex flex-row position-relative">
                {locations !== null && locations.line1.map((location, i) =>
                    <div key={"locationLine1-" + i}>
                        <Location location={Locations[location.id]} idLocation={location} />
                    </div>
                )}
            </div>
        </div>
    )
}