import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";


import GameBoard from "./GameBoard";

export default function App() {
    return (
        <Router>
            <Route path="/" component={GameBoard}/>
        </Router>
    )
}