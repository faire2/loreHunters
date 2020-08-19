export function takeLegendBonusByAutomaton(states) {
    const legend = states.legends[0];
    let breakLoops = false;
    // remove first bonus effect found on legend
    for (let i = 0; i < legend.fields.length && !breakLoops; i++) {
        for (let y = 0; y < legend.fields[i].length; y++) {
            if (legend.fields[i][y].effects.length > 0) {
                legend.fields[i][y].effects = [];
                breakLoops = true;
                break;
            }
        }
    }

    // remove the first assistant in the offer
    states.store.assistantsOffer.splice(0, 1, states.store.assistantsDeck[0]);
    states.store.assistantsDeck.splice(0, 1);
    return states;
}