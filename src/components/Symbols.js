import React from "react";
/*import sJeep from "../img/symbols/Gjeep.png"
import sWalk from "../img/symbols/Gwalk.png"
import sPlane from "../img/symbols/Gplane.png"
import sShip from "../img/symbols/Gship.png"*/

import draw1 from "../img/symbols/Card+.png"
import draw2 from "../img/symbols/Card++.png"
import destroyCard from "../img/symbols/CardX.png"
import discard from "../img/symbols/Card-.png"
import coin from "../img/symbols/C.png"
import explore from "../img/symbols/E.png"
import walk from "../img/symbols/Walk.png"
import ship from "../img/symbols/ship.png"
import jeep from "../img/symbols/Jeep.png"
import plane from "../img/symbols/Plane.png"
import adventurer from "../img/symbols/Adv.png"
import text from "../img/symbols/T.png"
import weapon from "../img/symbols/W.png"
import jewel from "../img/symbols/J.png"
import arrow from "../img/symbols/A.png"
import shiny from "../img/symbols/D.png"
import guardian from "../img/symbols/G.png"
import artifact from "../img/symbols/artifact.png"
import uptrade from "../img/symbols/uptrade.png"
import item from "../img/symbols/item.png"
import fear from "../img/symbols/Fear.png"

export const Coin = (props) => <img src={coin} alt="gain a coin" className="cardEffect"/>;
export const Explore = (props) => <img src={explore} alt="gain an explore token" className="cardEffect"/>;
export const Draw1Card = (props) => <img src={draw1} alt="draw a card" className="cardEffect"/>;
export const Draw2Cards = (props) => <img src={draw2} alt="draw two cards" className="cardEffect"/>;
export const Discard = (props) => <img src={discard} alt="discard a cart" className="cardEffect"/>;
export const DestroyCard = (props) => <img src={destroyCard} alt="destroy a card " className="cardEffect"/>;
export const Walk = (props) => <img src={walk} alt="walk" className="cardEffect"/>;
export const Ship = (props) => <img src={ship} alt="go by a ship" className="cardEffect"/>;
export const Jeep = (props) => <img src={jeep} alt="go by a jeep" className="cardEffect"/>;
export const Plane = (props) => <img src={plane} alt="go by a plane" className="cardEffect"/>;
export const Adventurer = (props) => <img src={adventurer} alt="adventurer" className="cardEffect"/>;
export const Text = (props) => <img src={text} alt="gain a text" className="cardEffect"/>;
export const Weapon = (props) => <img src={weapon} alt="gain a weapon" className="cardEffect"/>;
export const Jewel = (props) => <img src={jewel} alt="gain a jewel" className="cardEffect"/>;
export const Arrow = (props) => <img src={arrow} alt="exchanged for" className="cardEffect"/>;
export const Shiny = (props) => <img src={shiny} alt="shinies" className="cardEffect"/>;
export const Guardian = (props) => <img src={guardian} alt="guardian" className="cardEffect"/>;
export const Artifact = (props) => <img src={artifact} alt="artifact" className="cardEffect"/>;
export const Uptrade = (props) => <img src={uptrade} alt="uptrade" className="cardEffect"/>;
export const Item = (props) => <img src={item} alt="item" className="cardEffect"/>;
export const Fear = (props) => <img src={fear} alt="fear" className="cardEffect"/>;