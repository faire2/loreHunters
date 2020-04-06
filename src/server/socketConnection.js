import io from "socket.io-client"

/* for production / devel */
/*export const socket = io("https://lore-hunters.herokuapp.com");*/
export const socket = io(process.env.NODE_ENV === "development" ? "localhost:4001" : "https://lore-hunters.herokuapp.com");
export default socket;