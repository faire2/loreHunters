import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import Card from "../global/Card";

export default function Store(props) {
    const storeContext = useContext(BoardStateContext);

    return (
        <div>
            {storeContext.storeItems.map((card, i) =>
                <div key={i} >
                    <Card card={card} index={i}/>
                </div>
            )}
        </div>
    )

}