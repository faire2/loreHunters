import {FIELD_SIZE} from "../../../data/legends.mjs";

export function getPreviousColumnPositions(legend, previousColumnPositions, positions, previousColumnIndex) {
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].columnIndex === previousColumnIndex) {
            if (positions[i].fieldIndex === 0) {
                switch (legend.fields[previousColumnIndex][0].size) {
                    case FIELD_SIZE["1"]:
                        previousColumnPositions[i] = [true, previousColumnPositions[i][1], previousColumnPositions[i][2]];
                        break;
                    case FIELD_SIZE["1.5"]:
                    case FIELD_SIZE["2"]:
                        previousColumnPositions[i] = [true, true, previousColumnPositions[i][2]];
                        break;
                    case FIELD_SIZE["3"]:
                        previousColumnPositions[i] = [true, true, true];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
                // index 1 can in fact be real index 1 (if previous field size is 0) or 2 (if previous field size is 1)
            } else if (positions[i].fieldIndex === 1 && (legend.fields[previousColumnIndex][0].size === FIELD_SIZE["1"]
                || legend.fields[previousColumnIndex][0].size === FIELD_SIZE["1.5"])) {
                switch (legend.fields[previousColumnIndex][1].size) {
                    case FIELD_SIZE["1"]:
                        previousColumnPositions[i] = [previousColumnPositions[i][0], true, previousColumnPositions[i][2]];
                        break;
                    case FIELD_SIZE["1.5"]:
                    case FIELD_SIZE["2"]:
                        previousColumnPositions[i] = [previousColumnPositions[i][0], true, true];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            } else if (positions[i].fieldIndex === 1 && legend.fields[previousColumnIndex][0].size === FIELD_SIZE["2"]) {
                switch (legend.fields[previousColumnIndex][1].size) {
                    case FIELD_SIZE["1"]:
                        previousColumnPositions[i] = [previousColumnPositions[i][0], previousColumnPositions[i][1], true];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            } else if (positions[i].fieldIndex === 2) {
                switch (legend.fields[previousColumnIndex][2].size) {
                    case FIELD_SIZE["1"]:
                        previousColumnPositions[i] = [previousColumnPositions[i][0], previousColumnPositions[i][1], true];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            }
        }
    }
    return previousColumnPositions;
}