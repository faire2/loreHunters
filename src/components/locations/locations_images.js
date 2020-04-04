import React from "react";
import locationTemplateImage from "../../img/locations/template.png"
import locationEffectTemplate from "../../img/locations/effect_template.png"
import longestEffectTemplate from "../../img/locations/longest_effect_template.png"

export const LocationTemplate = (props) => <img src={locationTemplateImage} alt={"generic location template"} style={props.style}/>;
export const EffectTemplate = (props) => <img src={locationEffectTemplate} alt={"generic location template"} style={props.style}/>;
export const LongestEffect = (props) => <img src={longestEffectTemplate} alt={"generic location template"} style={props.style}/>;