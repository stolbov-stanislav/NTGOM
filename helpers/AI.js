export default class AI {
  constructor() {
    this._move = '';
    this._moveIndex = 0;
  }

  get move() {
    return this._move;
  }

  get moveIndex() {
    return this._moveIndex;
  }

  makeMove(options) {
    this._move = options[Math.floor(Math.random() * options.length)];
    this._moveIndex = options.indexOf(this._move);
  }

}
