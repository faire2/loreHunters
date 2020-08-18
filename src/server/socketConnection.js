import io from "socket.io-client"

/* for production / devel */
let ioAddress = null;
let stage = process.env.REACT_APP_STAGE;
console.log("REACT_APP_STAGE: " + stage);

switch (stage) {
    case "dev":
        ioAddress = "https://arnak-dev.herokuapp.com";
        break;
    case "prod":
        ioAddress = "https://arnak.herokuapp.com";
        break;
    default:
        ioAddress = "localhost:4001";
        console.warn("Unable to determine REACT_APP_STAGE. IO address set to local.")
}
console.log("Io address set to: " + ioAddress);
export const socket = io(ioAddress);