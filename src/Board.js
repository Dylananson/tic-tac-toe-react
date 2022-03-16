
import React from 'react';
import Square from './Square';

  class Board extends React.Component {
  
    renderSquare(i) {
      let square_type = 'square'
      if(this.props.winningSquares){
        square_type = this.props.winningSquares.includes(i) ? 'square-highlight' : 'square'
      }
                                               
      return (
        <Square
          className={square_type}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}  
        />
      );
    }


    render() {
      const arr = [0,1,2]
      const row = (row) => <div className="board-row">
            {arr.map((value, index) =>{
              return this.renderSquare(value + (row*3));
            })}
          </div>;

      const grid = <div>
        {arr.map((value, index) => {
          return row(value)
        })}
      </div>

      return (
        <div>
          {grid}
           
        </div>
      );
    }
  }

  export default Board;