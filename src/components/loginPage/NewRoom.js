import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {socket} from "../../server/socketConnection";
import FormControl from "react-bootstrap/FormControl";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {Button} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import {TRANSMISSIONS} from "../functions/enums";

export function NewRoom(props) {
    const [numOfPlayers, setNumOfPlayers] = useState(1);
    const [automaton, setAutomaton] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [existingRoomName, setExistingRoomName] = useState(false);

    useEffect(() => {
        socket.on(TRANSMISSIONS.roomNameAlreadyExists, () => {
            setExistingRoomName(true);
        });
    });

    function setUpGame() {
        socket.emit(TRANSMISSIONS.createGame, {roomName: roomName, numOfPlayers: numOfPlayers, automaton: automaton});
        console.log("emitting new room request");
        setExistingRoomName(false);
    }

    return (
        <div>
            <h3>Set a new game</h3>
            {existingRoomName &&
            <Alert variant={"warning"}>Room with this name already exists. Please choose another one!</Alert>}
            <Controls>
                <RoomName placeholder={"game room name"} value={roomName}
                          onChange={e => setRoomName(e.target.value)}/>
                <ControlsItem>
                    Players:
                </ControlsItem>
                <ControlsItem>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={e => setNumOfPlayers(e)}>
                        <ToggleButton value={1}>1</ToggleButton>
                        <ToggleButton value={2}>2</ToggleButton>
                        <ToggleButton value={3}>3</ToggleButton>
                        <ToggleButton value={4}>4</ToggleButton>
                    </ToggleButtonGroup>
                </ControlsItem>
                {/*<ControlsItem>
                    Automaton:
                </ControlsItem>
                <ControlsItem>
                    <label>
                        <Checkbox checked={automaton} onChange={() => setAutomaton(!automaton)}/>
                    </label>
                </ControlsItem>*/}
                {roomName && <Button variant="secondary" onClick={() => setUpGame()}>Create game</Button>}
            </Controls>
        </div>
    )
}

const Controls = styled.div`{
    display: flex;
    flex-flow: row;
    align-items: baseline;
`;

const RoomName = styled(FormControl)`
    width: 20vw;
`

const ControlsItem = styled.div`
    margin: 0 0 0 1vw;
`;
