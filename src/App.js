import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";


import GameBoard from "./GameBoard";
import {ScoringPanel} from "./components/scoring/ScoringPanel";

export default function App() {
    return (
        <Router>
            <Route path="/" exact component={GameBoard}/>
            <Route path="/scoring" exact component={ScoringPanel}/>
        </Router>
    )
}