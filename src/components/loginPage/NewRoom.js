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
    const [automaton, setAutomaton] = useState(4);
    const [legend, setLegend] = useState("legend2");
    const [roomName, setRoomName] = useState("");
    const [existingRoomName, setExistingRoomName] = useState(false);

    useEffect(() => {
        socket.on(TRANSMISSIONS.roomNameAlreadyExists, () => {
            setExistingRoomName(true);
        });
    });

    function setUpGame() {
        socket.emit(TRANSMISSIONS.createGame, {roomName: roomName, numOfPlayers: numOfPlayers, automaton: automaton, legend: legend});
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
                <ControlsItem>
                    Automaton:
                </ControlsItem>
                <ControlsItem>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={4} onChange={e => setAutomaton(e)}>
                        <ToggleButton value={0}>0</ToggleButton>
                        <ToggleButton value={1}>1</ToggleButton>
                        <ToggleButton value={2}>2</ToggleButton>
                        <ToggleButton value={3}>3</ToggleButton>
                        <ToggleButton value={4}>4</ToggleButton>
                        <ToggleButton value={5}>5</ToggleButton>
                    </ToggleButtonGroup>
                </ControlsItem>
                <ControlsItem>
                    Legend:
                </ControlsItem>
                <ControlsItem>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={"legend2"} onChange={e => setLegend(e)}>
                        <ToggleButton value={"legend1"}>Legend 1</ToggleButton>
                        <ToggleButton value={"legend2"}>Legend 2</ToggleButton>
                    </ToggleButtonGroup>
                </ControlsItem>
                <ControlsItem>
                {roomName && <Button variant="secondary" onClick={() => setUpGame()}>Create game</Button>}
                </ControlsItem>
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
    width: 15vw;
`

const ControlsItem = styled.div`
    margin: 0 0 0 1vw;
`;
