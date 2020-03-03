import React from 'react';
import {Hand} from "../cards/Hand";

export default function CardsArea(props) {
    return (
        <div>
            <div className="col-6">
                <Hand/>
            </div>
        </div>
    )
}