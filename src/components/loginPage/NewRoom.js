import React, {useEffect, useState} from "react";
import {socket} from "../../server/socketConnection";
import FormControl from "react-bootstrap/FormControl";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {Button} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import {TRANSMISSIONS} from "../functions/enums";

export function NewRoom(props) {
    const [numOfPlayers, setNumOfPlayers] = useState(1);
    const [roomName, setRoomName] = useState("");
    const [existingRoomName, setExistingRoomName] = useState(false);

    useEffect(() => {
        socket.on(TRANSMISSIONS.roomNameAlreadyExists, () => {
            setExistingRoomName(true);
        });
    });

    const containerStyle = {
        display: "flex",
        flexFlow: "row",
    };

    const playersStyle = {
        margin: "0.8vw 1vw 0 2vw"
    };

    function setUpGame() {
        socket.emit(TRANSMISSIONS.createGame, {roomName: roomName, numOfPlayers: numOfPlayers});
        console.log("emitting new room request");
        setExistingRoomName(false);
    }

    return (
        <div>
            <h3>Set a new game</h3>
            {existingRoomName &&
                <Alert variant={"warning"}>Room with this name already exists. Please choose another one!</Alert>}
            <div style={containerStyle}>
                <div>
                    <FormControl placeholder={"game room name"} value={roomName}
                                 onChange={e => setRoomName(e.target.value)}/>
                </div>
                <div style={playersStyle}>
                    Players:
                </div>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={e => setNumOfPlayers(e)}>
                    <ToggleButton value={1}>1</ToggleButton>
                    <ToggleButton value={2}>2</ToggleButton>
                    <ToggleButton value={3}>3</ToggleButton>
                    <ToggleButton value={4}>4</ToggleButton>
                </ToggleButtonGroup>

                {roomName && <Button variant="secondary" onClick={() => setUpGame()}>Create game</Button>}
            </div>
        </div>
    )
}