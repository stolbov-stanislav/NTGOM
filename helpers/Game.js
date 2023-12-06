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

    console.log(`\x1b[31mHMAC:\x1b[0m ${hashGenerator.hmac}`);

    let userMove = '';

    while(true) {
      this.drawMenu(rules.options, rules.optionsChars);

      userMove = this.askForMove();
  
      if (userMove === rules.exitChar) {
        return;
      }
  
      if (userMove === rules.helpChar) {
        // TODO: draw help
        continue;
      }

      if (!rules.isUserInputCorrect(userMove)) {
        this.drawHintForIncorrectInput(rules.optionsChars[0], rules.optionsChars.at(-1), rules.options[0], rules.exitChar, rules.helpChar);
        continue;
      }

      break;
    }

    const decision = rules.isWin(userMove)
    ? 'You win!'
    : rules.isDraw(userMove)
      ? 'Draw!'
      : 'You lose.';
    
    this.drawResults(userMove, ai.move, decision, hashGenerator.secret);
  }

  static drawMenu(options, chars) {
    console.log('\x1b[32mAvailable moves:\x1b[0m');
    chars.forEach((char, i) => {
      console.log(`\x1b[31m${char}\x1b[0m - \x1b[33m${options[i]}\x1b[0m`);
    });
    console.log('\x1b[32m0\x1b[0m - \x1b[32mexit\x1b[0m');
    console.log('\x1b[32m?\x1b[0m - \x1b[32mhelp\x1b[0m');
  }

  static askForMove() {
    return question('\x1b[31mEnter your move:\x1b[0m ');
  }

  static drawResults(userMove, aiMove, decision, secret) {
    console.log(`\x1b[33mYour move:\x1b[0m ${userMove}`);
    console.log(`\x1b[33mComputer move:\x1b[0m ${aiMove}`);
    console.log(`\x1b[31m${decision}\x1b[0m`);
    console.log(`\x1b[32mHMAC secret:\x1b[0m ${secret}`);
  }

  static drawHintForIncorrectInput(start, end, startOption, exit, help) {
    console.log('\x1b[34mYou entered an incorrect value.\x1b[0m');
    console.log(`\x1b[34mPlease enter a character from ${start} to ${end} corresponding to your choice: for example, "${start}" - "${startOption}" for playing.\x1b[0m`);
    console.log(`\x1b[34mEnter ${exit} or ${help} for exit or help respectively.\x1b[0m`);
  }
}
