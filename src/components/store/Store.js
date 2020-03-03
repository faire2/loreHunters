import React, {useContext} from "react";
import {StoreContext} from "../../Contexts";
import Card from "../cards/Card";

export default function Store(props) {
    const storeContext = useContext(StoreContext);

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