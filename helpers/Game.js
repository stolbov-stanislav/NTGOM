import { question } from 'readline-sync';
import AsciiTable from 'ascii-table';
import chalk from 'chalk';

import Rules from './Rules.js';
import AI from './AI.js';
import HashGenerator from './HashGenerator.js';

export default class Game {

  static start() {
    const rules = new Rules(process.argv.slice(2));

    if (!rules.isOptionsCorrected()) {
      console.log(chalk.red('You must pass 3 or more odd non-repeating arguments!'));
      console.log(`${chalk.green('Hint: ')}${chalk.yellow('npm start water rock scissors paper bird')}`);
      return;
    }

    const ai = new AI();
    ai.makeMove(rules.options);

    rules.drawOption = ai.move;

    const hashGenerator = new HashGenerator(ai.move);

    rules.collectLoseOptions(ai.moveIndex);

    console.log(`${chalk.red('HMAC:')} ${hashGenerator.hmac}`);

    let userMove = '';

    while(true) {
      this.drawMenu(rules.options, rules.optionsChars);

      userMove = this.askForMove();
  
      if (userMove === rules.exitChar) {
        return;
      }
  
      if (userMove === rules.helpChar) {
        this.drawHelp(rules.options);
        continue;
      }

      if (!rules.isUserInputCorrect(userMove)) {
        this.drawHintForIncorrectInput(rules.optionsChars[0], rules.optionsChars.at(-1), rules.options[0], rules.exitChar, rules.helpChar);
        continue;
      }

      break;
    }

    const userOption = rules.options[userMove - 1];

    const decision = rules.calculateDecision(userOption);
    
    this.drawResults(userOption, ai.move, decision, hashGenerator.secret);
  }

  static drawMenu(options, chars) {
    console.log(chalk.green('Available moves:'));
    chars.forEach((char, i) => {
      console.log(`${chalk.red(char)} - ${chalk.yellow(options[i])}`);
    });
    console.log(`${chalk.green('0')} - ${chalk.green('exit')}`);
    console.log(`${chalk.green('?')} - ${chalk.green('help')}`);
  }

  static drawHelp(options) {
    const limitedTableSize = 7;
    const limitedOptions = options.length <= limitedTableSize ? options.slice() : options.slice(0, limitedTableSize);
    
    console.log(chalk.blue('\nRules of the game:'));
    console.log(chalk.red('Half of the next ones in the circle win.'));
    console.log(chalk.red('Half of the previous ones in the circle lose.'));
    console.log(chalk.green('(the semantics of the lines is not important)'));
    console.log(chalk.yellow(`For example, if you choose "${limitedOptions[1]}" and the computer chooses "${limitedOptions[0]}", you win.`));
    console.log(chalk.blue('\nBelow is a table of solutions:'));

    const helpTable = new AsciiTable('NTGOM Help');

    helpTable.setBorder('|', '-', '+', '+');

    helpTable.setHeading('↓ PC / User →', ...limitedOptions);

    limitedOptions.forEach((firstOption) => {
      const decisions = limitedOptions.map((secondOption) => Rules.getDecision(limitedOptions, firstOption, secondOption));
      helpTable.addRow(firstOption, ...decisions);
    });
    
    console.log(helpTable.toString() + '\n');
  }

  static askForMove() {
    return question(chalk.red('Enter your move: '));
  }

  static drawResults(userMove, aiMove, decision, secret) {
    console.log(`${chalk.yellow('Your move:')} ${userMove}`);
    console.log(`${chalk.yellow('Computer move:')} ${aiMove}`);
    console.log(`${chalk.red(decision)}`);
    console.log(`${chalk.green('HMAC secret:')} ${secret}`);
  }

  static drawHintForIncorrectInput(start, end, startOption, exit, help) {
    console.log(chalk.blue('You entered an incorrect value.'));
    console.log(chalk.blue(`Please enter a character from ${start} to ${end} corresponding to your choice: for example, "${start}" - "${startOption}" for playing.`));
    console.log(chalk.blue(`Enter ${exit} or ${help} for exit or help respectively.`));
  }
}
