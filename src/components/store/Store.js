import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";

export default function Store(props) {
    const storeContext = useContext(BoardStateContext);

    return (
        <div className="float-left">
            {storeContext.store.itemsOffer.map((card, i) =>
                <div key={"item" + i} >
                    <Card card={card} index={i}/>
                </div>
            )}
            {storeContext.store.artifactsOffer.map((card, i) =>
                <div key={"artifact" + i} >
                    <Card card={card} index={i}/>
                </div>
            )}
        </div>
    )

}