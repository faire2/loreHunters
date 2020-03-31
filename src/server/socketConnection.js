import io from "socket.io-client"

/* for production / devel */
/*export const socket = io("https://lore-hunters.herokuapp.com");*/
export const socket = io("localhost:4001");

export default socket;