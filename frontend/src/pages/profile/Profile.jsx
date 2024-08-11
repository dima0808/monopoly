import './styles.css';
import React from 'react';
import {useParams} from "react-router-dom";

export default function Profile() {
    const { username } = useParams();

    return (
        <main>
            <h1>{username}</h1>
        </main>
    );
}