import React from "react";
import  styled  from "styled-components/native";
import { Pressable  } from "react-native";


export const TodoContainer =styled.View`
    display: flex;
    justify-content: center;
    align-items: center;   
`;
export const Todo =styled.View`
width: 70%;
margin: 3rem auto 0 auto;    
`;

export const Header =styled.View`
font-size: 2.5rem;
margin-bottom: 1rem;
text-align: center;
`;

export const Btn = styled(Pressable)`
    padding: 10px 1rem;
    background: #334;
    color: #334;
    border-radius: 5px;
    cursor: pointer;
`;
export const Btncontainer =styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

export const Todocontent =styled.View`
    margin-top: 2rem;
`;
