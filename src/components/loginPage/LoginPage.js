import React, {useEffect, useState} from "react";
import {CookiesProvider, useCookies} from "react-cookie"
import {socket} from "../../server/socketConnection";
import {TRANSMISSIONS} from "../../data/idLists";
import FormControl from "react-bootstrap/FormControl";
import {NewRoom} from "./NewRoom";
import {Alert} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {Room} from "./Room";

export function LoginPage() {
    const [cookies, setCookie] = useCookies(["username"]);
    const [formerUsername, setFormerUsername] = useState(cookies.username ? cookies.username : null);
    const [showCreateUsername, setShowCreateUsername] = useState(false);
    const [shakedHand, setShakedHand] = useState(false);
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomIsFull, setRoomIsFull] = useState();

    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setMonth(currentDate.getMonth() + 1);
    const history = useHistory();

    function handleUsernameChange(username) {
        setCookie("username", username, {path: "/", expires: expirationDate});
        setFormerUsername(username);
        if (!formerUsername) {
            socket.emit(TRANSMISSIONS.handShake, cookies.username);
        } else {
            socket.emit(TRANSMISSIONS.usernameChanged, {formerUsername: formerUsername, newUsername: username});
        }
        setShowCreateUsername(false);
    }

    function pressEnterToBlur(e) {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    useEffect(() => {
        // extend cookie if it exists
        if (cookies.username && !shakedHand) {
            setCookie("username", cookies.username, {path: "/", expires: expirationDate});
            socket.emit(TRANSMISSIONS.handShake, cookies.username);
            console.log("shaking hand");
        }

        socket.on(TRANSMISSIONS.roomCreated, data => {
            setRooms(data.rooms);
        });

        socket.on(TRANSMISSIONS.roomIsFull, data => {
            setRooms(data.rooms);
            setRoomIsFull(true);
        });

        socket.on(TRANSMISSIONS.startGame, data => {
            let playerIndex = data.room.players.indexOf(cookies.username);
            history.push({pathname: "/game", data: {username: cookies.username, room: data.room, playerIndex: playerIndex}});
        });

        socket.on(TRANSMISSIONS.currentUsersAndData, data => {
            console.log("received actual room and users data");
            if (!shakedHand) {
                setShakedHand(true)
            }
            setUsers(data.users);
            setRooms(data.rooms);
            setRoomIsFull(false);
        }, [])
    });

    const containerStyle = {
        margin: "10vw"
    };

    const CreateUsername = (props) =>
        <div>
            <h3>{props.username ? "Change" : "Enter"} your username:</h3>
            <FormControl type="text" onBlur={(e) => handleUsernameChange(e.target.value)} onKeyDown={e => pressEnterToBlur(e)}/>
        </div>;

    return (
        <CookiesProvider>
            <div style={containerStyle}>
                {cookies.username && <h1 onDoubleClick={() => setShowCreateUsername(!showCreateUsername)}>Hello {cookies.username}!</h1>}
                {(!cookies.username || showCreateUsername )&& <div><br/><CreateUsername username={cookies.username}/></div>}
                <br/>
                <CurrentUsers users={users}/>
                <br/>
                {shakedHand && <NewRoom/>}
                <br/>
                {roomIsFull && <Alert variant={"warning"}>Room you have tried to join is full</Alert>}
                {cookies.username && <CurrentRooms rooms={rooms} username={cookies.username}/>}
                {console.log(process.env)}
            </div>
        </CookiesProvider>
    )
}

const CurrentUsers = (props) =>
    <div>
        <h3>Currently logged users</h3>
        {props.users.map((user, i) =>
            <div key={i}>
                {user.username}
            </div>
        )}
    </div>;

const CurrentRooms = (props) =>
    <div>
        <h3>Currently active rooms</h3>
        {props.rooms.map((room, i) =>
            <div key={i}>
                <Room room={room} username={props.username}/>
            </div>
        )}
    </div>;

