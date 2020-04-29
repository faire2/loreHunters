import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import GameBoard from "./GameBoard";
import {ScoringPanel} from "./components/scoring/ScoringPanel";
import {LoginPage} from "./components/loginPage/LoginPage.js";

export default function App() {
    return (
        <Router>
            <Route path="/game" exact component={GameBoard}/>
            <Route path="/scoring" exact component={ScoringPanel}/>
            <Route path="/" exact component={LoginPage}/>
        </Router>
    )
}