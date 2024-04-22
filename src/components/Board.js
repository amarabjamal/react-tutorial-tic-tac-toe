import Square from "./Square"

export default function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares);

    let status;
    if (winner) {
        status = "Winner: " + squares[winner[0]];
    } else {
        if (!squares.includes(null)) {
            status = "The match is draw";
        } else {
            status = "Next player: " + (xIsNext ? 'X' : 'O');
        }
    }

    function handleClick(i) {
        if (squares[i] || winner) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const rows = [];
    for (let i = 0; i < 3; i++) {
        const cells = [];
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            cells.push(<Square key={index} className={winner?.includes(index) && "highlight-cell"} value={squares[index]} onSquareClick={() => handleClick(index)} />);
        }
        rows.push(<div key={i} className="board-row">{cells}</div>)
    }

    return (
        <>
            <div className="status">{status}</div>
            {rows}
        </>
    )
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }