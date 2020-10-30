export default {
  initialize: ({ state, getters, commit }) => {
    /* 
    initialize the sqaures 
    */

    commit("initialize", {
      squaresCount: 25
    });

    /* 
    make squares slide down
    */

    commit("landAll", {
      squares: state.squares,
      delay: getters.getSquareAnimationDelay
    });

    /** **/
  },

  select: ({ getters, dispatch, commit }, square) => {
    if (square.selected) {
      /**
       *  Case of selecting the already selected group
       */

      commit("updateScore", {
        numberSelected: getters.getSelecttedNumber,
        numberOfSquare: getters.getSelectedSquaresCount
      });

      /**
       *  calculate the new number for the sum square
       *  add range if the new number is higher than the curant range
       *  setting the other selected squares to 0
       */

      commit("sumSquares", {
        selectedSquare: square,
        selectedSquares: getters.getSelectedSquares
      });

      /**
       *  Update the grid numbers & squares after the sum operation
       */

      commit("updateGrid");

      /**
       *  Generate new squares
       */

      commit("generateNewSquares", {
        emtySquares: getters.getEmtySquares
      });

      /**
       *  Make squares slide down
       */

      commit("landAll", {
        squares: getters.getNotLandedSquares,
        delay: getters.getSquareAnimationDelay
      });

      /**
       *  set a all squares as not selected
       */

      commit("unselectAll");

      /****/
    } else {
      /**
       *  Case of  selecting a new groupe of squares
       */

      commit("unselectAll");

      /**
       *  Select all the squares attatched to the selected one that have the same numbe
       */

      dispatch("selectAttachedSiblings", square);

      /**
       *  If the number of selected squares is more than 2
       */

      if (getters.getSelectedSquaresCount < 2) {
        /**
         *  set a all squares as not selected
         */

        commit("unselectAll");
      }
    }
  },

  /**
   *  Select all the squares attatched to the selected one that have the same numbe
   */

  selectAttachedSiblings: ({ state, commit, dispatch }, square) => {
    let index = square.index;
    let surroundingsIndex = [index - 5, index + 5, index - 1, index + 1];

    surroundingsIndex
      .filter(srdIndex => srdIndex >= 0 && srdIndex < 25)
      .filter(
        srdIndex =>
          !(
            Math.abs(srdIndex - index) == 1 && (srdIndex % 5) + (index % 5) == 4
          )
      )
      .filter(srdIndex => state.squares[srdIndex].number == square.number)
      .filter(srdIndex => !state.squares[srdIndex].selected)
      .forEach(srdIndex => {
        {
          commit("setAsSelected", {
            square: state.squares[srdIndex]
          });
          dispatch("selectAttachedSiblings", state.squares[srdIndex]);
        }
      });
  },

  /**
   *  Destroy the game
   */
  destroy: ({ commit }) => commit("deleteGame")
};
