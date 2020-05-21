import io from "socket.io-client"
import {PIPELINE_STAGE} from "../data/idLists";
import {stage} from "./serverFunctions";

/* for production / devel */
let ioAddress = null;
switch (stage) {
    case PIPELINE_STAGE.local:
    ioAddress = "localhost:4001";
        break;
    case PIPELINE_STAGE.dev:
        ioAddress = "https://arnak-dev.herokuapp.com";
        break;
    case PIPELINE_STAGE.prod:
        ioAddress = "https://arnak.herokuapp.com";
        break;
    default:
        ioAddress = "https://arnak.herokuapp.com";
        console.error("Unable to determine socket address. Server stage: " + stage)
}
console.log("Io address set to: " + ioAddress);
export const socket = io(ioAddress);