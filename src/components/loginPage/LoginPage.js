import React, {useEffect, useState} from "react";
import {CookiesProvider, useCookies} from "react-cookie"
import {socket} from "../../server/socketConnection";
import {TRANSMISSIONS} from "../../data/idLists";
import FormControl from "react-bootstrap/FormControl";
import {NewRoom} from "./NewRoom";
import Button from "react-bootstrap/Button";
import {Alert, ButtonGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";

export function LoginPage() {
    const [cookies, setCookie] = useCookies(["username"]);
    const [shakedHand, setShakedHand] = useState(false);
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomIsFull, setRoomIsFull] = useState()

    const currentDate = new Date();
    const expirationDate = new Date()
    expirationDate.setMonth(currentDate.getMonth() + 1);
    const history = useHistory();

    function handleUsernameChange(username) {
        setCookie("username", username, {path: "/", expires: expirationDate});
        socket.emit(TRANSMISSIONS.handShake, cookies.username);
    }

    useEffect(() => {
        // extend cookie if it exists
        if (cookies.username && !shakedHand) {
            setCookie("username", cookies.username, {path: "/", expires: expirationDate})
            socket.emit(TRANSMISSIONS.handShake, cookies.username);
            console.log("shaking hand");
        }

        socket.on(TRANSMISSIONS.roomCreated, data => {
            setRooms(data.rooms);
        })

        socket.on(TRANSMISSIONS.roomIsFull, data => {
            setRooms(data.rooms);
        })

        socket.on(TRANSMISSIONS.startGame, data => {
            let playerIndex = data.room.players.indexOf(cookies.username);
            history.push({pathname: "/game", data: {username: cookies.username, room: data.room, playerIndex: playerIndex}});
        })

        socket.on(TRANSMISSIONS.currentUsersAndData, data => {
            console.log(data)
            if (!shakedHand) {
                setShakedHand(true)
            }
            setUsers(data.users);
            setRooms(data.rooms);
        }, [])
    })

    const containerStyle = {
        margin: "10vw"
    }

    const CreateUsername = () =>
        <div>
            <h3>Enter your username:</h3>
            <FormControl type="text" onBlur={(e) => handleUsernameChange(e.target.value)}/>
        </div>

    return (
        <CookiesProvider>
            <div style={containerStyle}>
                {cookies.username && <h1>Hello {cookies.username}!</h1>}
                <br/>
                {!cookies.username && <CreateUsername/>}
                <br/>
                <CurrentUsers users={users}/>
                <br/>
                {cookies.username && <NewRoom/>}
                <br/>
                {roomIsFull && <Alert variant={"warning"}>Room you have tried to join is full</Alert>}
                {cookies.username && <CurrentRooms rooms={rooms} username={cookies.username}/>}
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
    </div>

const CurrentRooms = (props) =>
    <div>
        <h3>Currently active rooms</h3>
        {props.rooms.map((room, i) =>
            <div key={i}>
                <Room room={room} username={props.username}/>
            </div>
        )}
    </div>

const Room = (props) => {
    const username = props.username;
    const room = props.room;
    const hasJoined = room.players.includes(username);
    const hasFreeSlots = room.numOfPlayers > room.players.length
    const readyToStart = !hasFreeSlots && hasJoined

    const containerStyle = {
        display: "flex",
        flexFlow: "rox",
        marginLeft: "1vw"
    }

    function joinSession() {
        socket.emit(TRANSMISSIONS.joinGame, {room: room})
    }

    const players =
        <div style={containerStyle}>
            {room.players.map((username, i) =>
                <div style={{marginLeft: "1vw"}} key={i}>
                    {username}
                </div>
            )}
        </div>

    return (
        <div>
            <div style={{display: "flex", flexFlow: "row", alignItems: "center"}}>
                <h4>{room.name}</h4>  &nbsp;&nbsp;&nbsp;(game for {room.numOfPlayers})
                {players}
            </div>
            <ButtonGroup>
                {!hasJoined && hasFreeSlots &&
                <Button onClick={() => joinSession()} variant="secondary" size="sm">Join</Button>}
                {readyToStart && <Button onClick={() => socket.emit(TRANSMISSIONS.startGame,{roomName: room.name})} variant="secondary" size="sm">Open game</Button>}
            </ButtonGroup>


        </div>
    )
}