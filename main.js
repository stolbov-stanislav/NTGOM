import { question } from 'readline-sync';

import Rules from './helpers/Rules.js';
import AI from './helpers/AI.js';
import HashGenerator from './helpers/HashGenerator.js';

const rules = new Rules(process.argv.slice(2));

const isArgsCorrected = rules.isOptionsCorrected();
if (!isArgsCorrected) {
  // TODO: process hint output.
  console.log('You must pass 3 or more odd non-repeating arguments!');
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
