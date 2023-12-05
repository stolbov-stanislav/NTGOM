export default class Rules {
  constructor(moves) {
    this._options = moves;
    this._loseMoves = [];
    this._drawMove = '';
  }

  get options() {
    return this._options;
  }

  set drawMove(option) {
    if ((typeof option === 'string') && (this._options.includes(option))) {
      this._drawMove = option;
    }
  }

  isOptionsCorrected() {
    return !(
      (this._options.length < 3) || 
      (this._options.length % 2 === 0) || 
      (this._options.length !== new Set(this._options).size)
    );
  }

  collectLoseMoves(anchorIndex) {
    const half = (this._options.length - 1) / 2;
    for (let shift = 1; shift <= half; shift++) {
      this._loseMoves.push(this._options.at(anchorIndex - shift));
    }
  }

  isDraw(move) {
    return this._drawMove === move;
  }

  isWin(move) {
    return !this.isDraw(move) && !this._loseMoves.includes(move);
  }
}
