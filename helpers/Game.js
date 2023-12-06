import { question } from 'readline-sync';

import Rules from './Rules.js';
import AI from './AI.js';
import HashGenerator from './HashGenerator.js';

export default class Game {

  static start() {
    const rules = new Rules(process.argv.slice(2));

    if (!rules.isOptionsCorrected()) {
      console.log('\x1b[31mYou must pass 3 or more odd non-repeating arguments!\x1b[0m');
      console.log('\x1b[32mHint:\x1b[0m \x1b[33mnode main spok rock scissors paper bird\x1b[0m');
      return;
    }

    const ai = new AI();
    ai.makeMove(rules.options);

    rules.drawMove = ai.move;

    const hashGenerator = new HashGenerator(ai.move);

    rules.collectLoseMoves(ai.moveIndex);

    function drawMenu(items) {
      items.forEach((item, i) => {
        console.log(`${i + 1} - ${item}`);
      });
      console.log('0 - exit');
      console.log('? - help');
    }

    drawMenu(rules.options);

    function askForMove() {
      return question('Enter your move: ');
    }

    const userMove = askForMove();

    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${ai.move}`);
    const decision = rules.isWin(userMove)
      ? 'You win!'
      : rules.isDraw(userMove)
        ? 'Draw!'
        : 'You lose.';
    console.log(decision);
    // TODO: process draw case!
    console.log(`HMAC secret: ${hashGenerator.secret}`);
  }
}
