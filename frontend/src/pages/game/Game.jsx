import { useEffect } from 'react';

import './styles.css';

import Players from "../../components/game/players/Players";
import Board from "../../components/game/board/Board";
import Actions from "../../components/game/actions/Actions";

export default function Game() {
    useEffect(() => {
        document.documentElement.classList.add('game-html');
        return () => {
            document.documentElement.classList.remove('game-html');
        };
    }, []);

    return (
        <div className="grid-3">
            <Players />
            <Board />
            <Actions />
        </div>
    );
}