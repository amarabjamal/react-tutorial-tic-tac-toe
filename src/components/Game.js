import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [displayMoveOrder, setDisplayMoveOrder] = useState('asce');

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);

    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }

        if (move === currentMove) {
            return <span key={move}>You are at move #{move}</span>
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
        <div className="game-info">
            <label>Display:
                <select value={displayMoveOrder} onChange={(e) => setDisplayMoveOrder(e.target.value)}>
                    <option value="asce" selected>Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <ol>{displayMoveOrder === 'asce' ? moves : moves.reverse()}</ol>
        </div>
    </div>
    );
}