import { useEffect } from "react";
import './styles.css';

export default function Dice({ dice }) {

    function toggleClasses(die) {
        die.classList.toggle("odd-roll");
        die.classList.toggle("even-roll");
    }

    useEffect(() => {
        if (dice.firstRoll !== null && dice.secondRoll !== null) {
            const diceElements = [...document.querySelectorAll(".die-list")];
            diceElements.forEach((dieElement) => {
                toggleClasses(dieElement);
            });
            diceElements[0].dataset.roll = dice.firstRoll;
            diceElements[1].dataset.roll = dice.secondRoll;
        }
    }, [dice]);

    return (
        <div className="dice-container">
            <div className="dice">
                <ol className="die-list even-roll" data-roll="1" id="die-1">
                    <li className="die-item" data-side="1">
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="2">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="3">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="4">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="5">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="6">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                </ol>
                <ol className="die-list odd-roll" data-roll="1" id="die-2">
                    <li className="die-item" data-side="1">
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="2">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="3">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="4">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="5">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                    <li className="die-item" data-side="6">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </li>
                </ol>
            </div>
        </div>
    );
}