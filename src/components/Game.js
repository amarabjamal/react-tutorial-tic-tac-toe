import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [displayMoveAscendingOrder, setDisplayMoveAscendingOrder] = useState(true);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);

    }

    function handleReset() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }

        if (move === currentMove) {
            return <li key={move}>You are at move #{move}</li>
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
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onReset={handleReset} />
            </div>
            <div className="game-info">
                <label>Display:
                    <button onClick={() => setDisplayMoveAscendingOrder(!displayMoveAscendingOrder)}>{displayMoveAscendingOrder ? 'Ascending' : 'Descending'}</button>
                </label>
                <ol>{displayMoveAscendingOrder ? moves : moves.reverse()}</ol>
            </div>
        </div>
    );
}