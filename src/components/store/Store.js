import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";
import staff from "../../img/staff.png"

export default function Store() {
    const storeContext = useContext(BoardStateContext);
    const store = storeContext.store;

    const items = store !== null && store.itemsOffer.map((card, i) =>
            <div key={"item" + i} >
                <Card card={card} index={i}/>
            </div> )

    const artifacts = store !== null && store.artifactsOffer.map((card, i) =>
        <div key={"artifact" + i} >
            <Card card={card} index={i}/>
        </div>
    )

    const leftMargin = storeContext.round * 6.8 + "vw"
    const staffStyle = {
        height: "11vw",
        width: "3vw",
        marginTop: "-2vw",
        position: "absolute",
        marginLeft: leftMargin,
        left: "1.7vw",
        zIndex: 2
    }

    return (
        <div className="d-flex flex-row">
            {artifacts}
            <div style={staffStyle}>
                <img src={staff} height={"100%"} width={"100%"}/>
            </div>
            {items}
        </div>
    )

}

