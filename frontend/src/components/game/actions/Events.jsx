import "./styles.css";

export default function Events({isCurrentUserTurn, hasRolledDice, handleRollDice, handleEndTurn}) {
    return (
        <div>
            <h2>Events</h2>
            {isCurrentUserTurn && !hasRolledDice && <button onClick={handleRollDice}>roll</button>}
            {isCurrentUserTurn && hasRolledDice && <button onClick={handleEndTurn}>end turn</button>}
        </div>
    );
}