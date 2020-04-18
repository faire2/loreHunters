import React from "react";
import locationTemplateImage from "../../img/locations/template.png"
import locationEffectTemplate from "../../img/locations/effect_template.png"
import longestEffectTemplate from "../../img/locations/longest_effect_template.png"
import l11 from "../../img/locations/l11.png"
import l12 from "../../img/locations/l12.png"
import l13 from "../../img/locations/l13.png"
import l14 from "../../img/locations/l14.png"
import l15 from "../../img/locations/l15.png"
import b21 from "../../img/locations/b21.png"
import b22 from "../../img/locations/b22.png"
import b23 from "../../img/locations/b23.png"
import b24 from "../../img/locations/b24.png"
import b25 from "../../img/locations/b25.png"
import g21 from "../../img/locations/g21.png"
import g22 from "../../img/locations/g22.png"
import g23 from "../../img/locations/g23.png"
import g24 from "../../img/locations/g24.png"
import g25 from "../../img/locations/g25.png"
import g26 from "../../img/locations/g26.png"
import b31 from "../../img/locations/b31.png"
import b32 from "../../img/locations/b32.png"
import b33 from "../../img/locations/b33.png"
import g31 from "../../img/locations/g31.png"
import g32 from "../../img/locations/g32.png"
import g33 from "../../img/locations/g33.png"

import bgr1 from "../../img/locations/bgr-1.png"
import bgr1Double from "../../img/locations/bgr-1double.png"
import bgrG2 from "../../img/locations/bgr-g2.png"
import bgrG3 from "../../img/locations/bgr-g3.png"
import bgrB2 from "../../img/locations/bgr-b2.png"
import bgrB3 from "../../img/locations/bgr-b3.png"

import bgrG2Unexplored from "../../img/locations/bgr-g2-back.png";
import bgrG3Unexplored from "../../img/locations/bgr-g3-back.png";
import bgrB2Unexplored from "../../img/locations/bgr-b2-back.png";
import bgrB3Unexplored from "../../img/locations/bgr-b3-back.png";

export const LocationTemplate = (props) => <img src={locationTemplateImage} alt={"generic location template"} style={props.style}/>;
export const EffectTemplate = (props) => <img src={locationEffectTemplate} alt={"generic location template"} style={props.style}/>;
export const LongestEffect = (props) => <img src={longestEffectTemplate} alt={"generic location template"} style={props.style}/>;

const effectStyle = {
  height: "1em",
  display: "inline-block"
};

export const L11  = () => <img src={l11} alt={"location effect"} style={effectStyle}/>;
export const L12  = () => <img src={l12} alt={"location effect"} style={effectStyle}/>;
export const L13  = () => <img src={l13} alt={"location effect"} style={effectStyle}/>;
export const L14  = () => <img src={l14} alt={"location effect"} style={effectStyle}/>;
export const L15  = () => <img src={l15} alt={"location effect"} style={effectStyle}/>;
export const B21  = () => <img src={b21} alt={"location effect"} style={effectStyle}/>;
export const B22  = () => <img src={b22} alt={"location effect"} style={effectStyle}/>;
export const B23  = () => <img src={b23} alt={"location effect"} style={effectStyle}/>;
export const B24  = () => <img src={b24} alt={"location effect"} style={effectStyle}/>;
export const B25  = () => <img src={b25} alt={"location effect"} style={effectStyle}/>;
export const B31  = () => <img src={b31} alt={"location effect"} style={effectStyle}/>;
export const B32  = () => <img src={b32} alt={"location effect"} style={effectStyle}/>;
export const B33  = () => <img src={b33} alt={"location effect"} style={effectStyle}/>;
export const G21  = () => <img src={g21} alt={"location effect"} style={effectStyle}/>;
export const G22  = () => <img src={g22} alt={"location effect"} style={effectStyle}/>;
export const G23  = () => <img src={g23} alt={"location effect"} style={effectStyle}/>;
export const G24  = () => <img src={g24} alt={"location effect"} style={effectStyle}/>;
export const G25  = () => <img src={g25} alt={"location effect"} style={effectStyle}/>;
export const G26  = () => <img src={g26} alt={"location effect"} style={effectStyle}/>;
export const G31  = () => <img src={g31} alt={"location effect"} style={effectStyle}/>;
export const G32  = () => <img src={g32} alt={"location effect"} style={effectStyle}/>;
export const G33  = () => <img src={g33} alt={"location effect"} style={effectStyle}/>;

const backgroundStyle = {
  width: "100%",
  verticalAlign: "top"
};

export const BgrBasic  = () => <img src={bgr1} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBasicDouble  = () => <img src={bgr1Double} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrGreen2  = () => <img src={bgrG2} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrGreen3  = () => <img src={bgrG3} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBrown2  = () => <img src={bgrB2} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBrown3  = () => <img src={bgrB3} alt={"basic location background"} style={backgroundStyle}/>;

export const BgrGreen2Unexplored  = () => <img src={bgrG2Unexplored} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrGreen3Unexplored  = () => <img src={bgrG3Unexplored} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBrown2Unexplored  = () => <img src={bgrB2Unexplored} alt={"basic location background"} style={backgroundStyle}/>;
export const BgrBrown3Unexplored  = () => <img src={bgrB3Unexplored} alt={"basic location background"} style={backgroundStyle}/>;