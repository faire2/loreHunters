import React from "react";

import bgr1 from "../../../img/locations/bgr-1.png"
import bgr1Double from "../../../img/locations/bgr-1double.png"
import bgrG2 from "../../../img/locations/bgr-g2.png"
import bgrG3 from "../../../img/locations/bgr-g3.png"
import bgrB2 from "../../../img/locations/bgr-b2.png"
import bgrB3 from "../../../img/locations/bgr-b3.png"
import bgrLC from "../../../img/locations/bgr-lostCity.png"
import bgrEmpty from "../../../img/locations/bgr-empty.png"
import greenEmpty from "../../../img/locations/greenEmpty.png"
import brownEmpty from "../../../img/locations/brownEmpty.png"

import bgrBrownUnexplored from "../../../img/locations/unexp-bgr-b.png";
import bgrGreenUnexplored from "../../../img/locations/unexp-bgr-g.png";

import level2Symbol from "../../../img/locations/l2.png"
import level3Symbol from "../../../img/locations/l3.png"

const effectStyle = {
  height: "1em",
  display: "inline-block"
};

const backgroundStyle = {
  width: "100%",
  verticalAlign: "top"
};

export const BgrBasic  = () => <img src={bgr1} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBasicDouble  = () => <img src={bgr1Double} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrGreen2  = () => <img src={bgrG2} alt={"green location l2 background"} style={backgroundStyle}/>;
export const BgrGreen3  = () => <img src={bgrG3} alt={"green location l3 background"} style={backgroundStyle}/>;
export const BgrBrown2  = () => <img src={bgrB2} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBrown3  = () => <img src={bgrB3} alt={"brown location l2 background"} style={backgroundStyle}/>;
export const BgrLostCity  = () => <img src={bgrLC} alt={"brown location l2 background"} style={backgroundStyle}/>;
export const BgrEmpty  = () => <img src={bgrEmpty} alt={"empty unexplored location"} style={backgroundStyle}/>;
export const BgrGreenEmpty  = () => <img src={greenEmpty} alt={"green location"} style={backgroundStyle}/>;
export const BgeBrownEmpty  = () => <img src={brownEmpty} alt={"brown location"} style={backgroundStyle}/>;

export const BgrBrownUnexplored = () => <img src={bgrBrownUnexplored} alt={"brown unexplored location background"} style={backgroundStyle}/>;
export const BgrGreenUnexplored = () => <img src={bgrGreenUnexplored} alt={"green unexplored  location background"} style={backgroundStyle}/>;

export const Level2Symbol = () => <img src={level2Symbol} alt={"location level 2 symbol"} style={effectStyle}/>;
export const Level3Symbol = () => <img src={level3Symbol} alt={"location level 3 symbol"} style={effectStyle}/>;