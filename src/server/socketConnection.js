import io from "socket.io-client"

/* for production / devel */
let ioAddress = null;
if (process.env.NODE_ENV === "development") {
    ioAddress = "localhost:4001";
} else if (process.env.stage === "dev") {
    ioAddress = "https://arnak-dev.herokuapp.com";
} else {
    ioAddress = "https://arnak.herokuapp.com";
}
console.log("Io address set to: " + ioAddress);
export const socket = io(ioAddress);