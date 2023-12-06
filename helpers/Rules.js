export default class Rules {
  constructor(options) {
    this._options = options;
    this._loseOptions = [];
    this._drawOption = '';
    this._exitChar = '0';
    this._helpChar = '?';
    this._optionsChars = Array.isArray(options) && options.map((_, i) => `${i + 1}`);
  }

  static getDecision(options, firstOption, secondOption) {
    if (firstOption === secondOption) {
      return 'draw';
    }

    const half = (options.length - 1) / 2;
    const loseOptions = [];
    for (let shift = 1; shift <= half; shift++) {
      loseOptions.push(options.at(options.indexOf(firstOption) - shift));
    }

    return loseOptions.includes(secondOption)
      ? 'lose'
      : 'win';
  }

  get options() {
    return this._options;
  }

  get exitChar() {
    return this._exitChar;
  }

  get helpChar() {
    return this._helpChar;
  }

  get optionsChars() {
    return this._optionsChars;
  }

  set drawOption(option) {
    if ((typeof option === 'string') && (this._options.includes(option))) {
      this._drawOption = option;
    }
  }

  isOptionsCorrected() {
    return !(
      (this._options.length < 3) || 
      (this._options.length % 2 === 0) || 
      (this._options.length !== new Set(this._options).size)
    );
  }

  isUserInputCorrect(move) {
    return this._optionsChars.includes(move);
  }

  collectLoseOptions(anchorIndex) {
    const half = (this._options.length - 1) / 2;
    for (let shift = 1; shift <= half; shift++) {
      this._loseOptions.push(this._options.at(anchorIndex - shift));
    }
  }

  isDraw(option) {
    return this._drawOption === option;
  }

  isWin(option) {
    return !this.isDraw(option) && !this._loseOptions.includes(option);
  }

  calculateDecision(option) {
    return this.isWin(option)
      ? 'You win!'
      : this.isDraw(option)
        ? 'Draw!'
        : 'You lose.';
  }
}
