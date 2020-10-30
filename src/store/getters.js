export default {
  /* get all the selected squares */
  getSelectedSquares: state => state.squares.filter(square => square.selected),

  /* get the number of selected squares */
  getSelectedSquaresCount: (state, getters) =>
    getters.getSelectedSquares.length,

  /* get the squares that are not landingy */
  getNotLandedSquares: state => state.squares.filter(square => !square.landing),

  /* get the emty squares */
  getEmtySquares: state => state.squares.filter(square => square.number == 0),

  /* get the selected number */
  getSelecttedNumber: (state, getters) => getters.getSelectedSquares[0].number,

  /* get the landing square animation's delay */
  getSquareAnimationDelay: state =>
    state.Settings.animations.SquareAnimation.delay

  /* eND?*/
};
