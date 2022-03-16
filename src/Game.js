
import React from 'react';
import Board from './Board';

  class Game extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          row : null,
          col: null
        }],
        stepNumber: 0,
        xIsNext: true,
        isSortDescending: true ,
        winningSquares: null,
        draw: false,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      const {winner, winningSquares} = calculateWinner(squares)
      if (winner || squares[i]) {
        return;
      }
      const type = this.state.xIsNext ? 'X' : 'O'
      squares[i] = type
      const isDraw = !squares.includes(null) 
      const row = parseInt(i  / 3);
      const col = parseInt(i % 3);
      this.setState({
        history: history.concat([{
          squares: squares,
          row : row,
          col : col,
          type: type 
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        selected: null,
        winningSquares: winningSquares,
        isDraw: isDraw,
      })
      console.log(squares)
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        selected: step
      });
    }

    changeSort(){
      this.setState({
          isSortDescending: !this.state.isSortDescending
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const {winner, winningSquares} = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + ' ' + step.type + " (" + step.row + ", "+ step.col + ")" :
          'Go to game start';
        return (
          <li key={move}>
            <button
              className={move === this.state.selected ? 'button-bold' : 'button'}
              onClick={() => this.jumpTo(move)}>
                {desc}
            </button>
          </li>
        )
      })
      
      const movesSorted = this.state.isSortDescending ? moves : moves.reverse()
      let status;
      if (winner){
        status = 'Winner: ' + winner;
      } else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      const sort = this.state.isSortDescending ? 'Sort ascending' : 'Sort descending'
      status = this.state.isDraw ? <div>'Game is a draw'</div> : null
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              winningSquares={winningSquares}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.changeSort()}>
              {sort}
            </button>
            <ol>{movesSorted}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
      for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          return {winner: squares[a], winningSquares: [a,b,c]};
        }
      }
    return {winner: null, winningSquares: null}
  }

  export default Game;