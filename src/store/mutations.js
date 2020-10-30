import state from "./state";
export default {
  /**
   *  initialize the sqaures
   */

  initialize: (state, { squaresCount }) => {
    for (let i = 0; i < squaresCount; i++) {
      state.squares.push({
        number: Math.floor(Math.random() * Math.floor(state.range) + 1),
        selected: false,
        index: i,
        landing: false
      });
    }
  },

  /**
   *  make squares slide down
   */

  landAll: ({ squares, delay }) => {
    let animationDelay = delay;

    squares.forEach(square => {
      setTimeout(() => {
        square.landing = true;
      }, animationDelay);
      animationDelay += 500;
    });
  },

  /**
   *  set a square as selected
   */

  setAsSelected: (state, { square }) => {
    state.squares[square.index].selected = true;
  },

  /**
   *  set a all squares as not selected
   */

  unselectAll: state => {
    state.squares.forEach(square => {
      square.selected = false;
    });
  },

  /**
   *  calculate the new number for the sum square
   *  add range if the new number is higher than the curant range
   *  setting the other selected squares to 0
   */

  sumSquares: (state, { selectedSquare, selectedSquares }) => {
    selectedSquare.number++;
    selectedSquare.selected = false;

    if (selectedSquare.number > state.range) {
      state.range++;
    }

    selectedSquares
      .filter(square => square.index != selectedSquare.index)
      .forEach(square => {
        square.number = 0;
      });
  },

  /**
   *  Update the grid numbers & squares after the sum operation
   */

  updateGrid: (state) => {
    let topIndex;

    /**
     *  landing squares from top
     *  Setting  emty top squares to 0
     */

    for (let t = 0; t < 10; t++) {
      for (let i = 24; i >= 0; i--) {
        if (state.squares[i].number == 0) {
          topIndex = i - 5;
          if (topIndex >= 0) {
            state.squares[i].number = state.squares[topIndex].number;
            state.squares[topIndex].number = 0;
          }
        }
      }
    }
  },

  generateNewSquares: ({}, { emtySquares }) => {
    emtySquares.forEach(square => {
      square.number = Math.floor(Math.random() * state.range + 1);
      square.landing = false;
    });
  },

  /**
   *  Update the score after the sum operation
   */

  updateScore: (state, { numberOfSquare, numberSelected }) => {
    state.score += numberOfSquare * numberSelected;
  },

  /**
   *  delete the game
   */

  deleteGame: state => {
    state.squares = [];
    state.score = 0;
  }
};
