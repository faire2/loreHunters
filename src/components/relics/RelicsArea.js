import React from "react";
import {Coin, Draw1Card, Explore, Jewel, Text, Weapon} from "../Symbols";
import bgr from "../../img/relics/relicsBackground.png"

export function RelicsArea() {
    const containerStyle = {
        backgroundImage: `url(${bgr}`,
        backgroundSize: "100%",
        position: "absolute",
        marginTop: "19vw",
        marginLeft: "67vw",
        width: "20vw",
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: "4.1vw",
        paddingTop: "1%",

    }

    const fieldStyle1Icon = {
        height: "4vw",
        width: "26%",
        marginRight: "4.5%",
        marginBottom: "11%",
        fontSize: "3vw",
    }

    const fieldStyle2Icons = {
        height: "4vw",
        width: "26%",
        marginRight: "4.5%",
        marginBottom: "11%",
        fontSize: "2vw",
    }

    const longFieldStyle = {
        height: "3vw",
        margin: "1vw",
        backgroundColor: "red",
        width: "10vw",
    }

    const overLapStyle = {
        marginTop: "-1.3vw"
    }

    const field1 = <div style={fieldStyle1Icon}><Jewel/></div>
    const field2 = <div style={fieldStyle1Icon}><Jewel/></div>
    const field3 = <div style={fieldStyle2Icons}><Coin/><div style={overLapStyle}><Weapon/></div></div>
    const field4 = <div style={fieldStyle1Icon}><Weapon/></div>
    const field5 = <div style={fieldStyle2Icons}><Explore/><div style={overLapStyle}><Text/></div></div>
    const field6 = <div style={fieldStyle2Icons}><Coin/><div style={overLapStyle}><Text/></div></div>
    const field7 = <div style={fieldStyle1Icon}><Text/></div>
    const field8 = <div style={fieldStyle1Icon}><Explore/></div>
    const field9 = <div style={fieldStyle1Icon}><Draw1Card/></div>
    const fieldLong = <div style={longFieldStyle}></div>
    return(
        <div style={containerStyle}>
            {field1}{field2}{field3}
            {field4}{field5}{field6}
            {field7}{field8}{field9}
            {fieldLong}
        </div>
    )
}