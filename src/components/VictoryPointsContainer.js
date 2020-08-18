import React from "react";
import styled from "styled-components";
import vpBgr from "../img/symbols/VP.png";

export const VictoryPointsContainer = (props) => {
    return (
        <Container size={props.size} fontSize={props.fontSize}>
            {props.points}
        </Container>
    )
};

const Container = styled.div`
    background-image: url(${vpBgr});
    background-size: cover;
    color: white;
    width: ${props => props.size ? props.size + "vw" : "2vw"};
    height: ${props => props.size ? props.size * 1.1 + "vw" : "2.4vw"};
    font-size: ${props => props.fontSize ? props.fontSize + "vw" : "2.4vw"};
    display: flex;
    align-items: center;
    justify-content: center;
`;
