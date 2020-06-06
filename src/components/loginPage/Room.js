import {socket} from "../../server/socketConnection";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {Export2Xls} from "./Export2Xls";
import {TRANSMISSIONS} from "../functions/lists";

export const Room = (props) => {
    const username = props.username;
    const room = props.room;
    const hasJoined = room.players.includes(username);
    const hasFreeSlots = room.numOfPlayers > room.players.length;
    const readyToStart = !hasFreeSlots && hasJoined;

    const containerStyle = {
        display: "flex",
        flexFlow: "rox",
        marginLeft: "1vw"
    };

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
        </div>;
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
                <Button onClick={() => socket.emit(TRANSMISSIONS.deleteRoom, {roomName: room.name})}
                        variant={"secondary"} size={"sm"}>Delete room</Button>
                {room.states.gameLog.length > 0 && <Export2Xls gameLog={room.states.gameLog} playerNames={room.players}/>}
            </ButtonGroup>
        </div>
    )
};