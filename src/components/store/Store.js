import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";

export default function Store(props) {
    const storeContext = useContext(BoardStateContext);

    return (
        <div className="float-left">
            {storeContext.storeOffer.map((card, i) =>
                <div key={i} >
                    <Card card={card} index={i}/>
                </div>
            )}
        </div>
    )

}