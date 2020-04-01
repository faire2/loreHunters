import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";

export default function Store(props) {
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

    return (
        <div className="float-left">
            {items}
            {artifacts}
        </div>
    )

}