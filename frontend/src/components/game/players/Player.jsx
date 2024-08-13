import React from 'react';
import Cookies from "js-cookie";

export default function Player({player: {user, isLeader, civilization}, onCivChange}) {
    return (
        <div>
            <h4>{isLeader && <span>👑</span>} {user.username}</h4>
            <select disabled={Cookies.get('username') !== user.username}
                    onChange={(event) => onCivChange(event.target.value)} value={civilization}>
                <option value="RANDOM">Random</option>
                <option value="COLOMBIA">Colombia</option>
                <option value="EGYPT">Egypt</option>
                <option value="GERMANY">Germany</option>
                <option value="JAPAN">Japan</option>
                <option value="KOREA">Korea</option>
                <option value="ROME">Rome</option>
                <option value="SWEDEN">Sweden</option>
            </select>
        </div>
    );
}