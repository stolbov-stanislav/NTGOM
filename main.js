import { question } from 'readline-sync';

import HashGenerator from './helpers/HashGenerator.js';
import AI from './helpers/AI.js';

const args = process.argv.slice(2);

const argsError = (args.length < 3) || (args.length % 2 === 0) || (args.length !== new Set(args).size);
if (argsError) {
  // TODO: process hint output.
  console.log('You must pass 3 or more odd non-repeating arguments!');
}

const ai = new AI();
ai.makeMove(args);

const hashGenerator = new HashGenerator(ai.move);

const userLoseMoves = [];
const half = (args.length - 1) / 2;
for (let shift = 1; shift <= half; shift++) {
  userLoseMoves.push(args.at(ai.moveIndex - shift));
}
console.log('userLoseMoves', userLoseMoves);
console.log('half', half);
console.log('computerMoveIndex', ai.moveIndex);

console.log('args', args);
console.log('secret', hashGenerator.secret);
console.log('computerMove', ai.move);
console.log('hmac', hashGenerator.hmac);

function drawMenu(items) {
  items.forEach((item, i) => {
    console.log(`${i + 1} - ${item}`);
  });
  console.log('0 - exit');
  console.log('? - help');
}

drawMenu(args);

function askForMove() {
  return question('Enter your move: ');
}

const userMove = askForMove();

console.log(`Your move: ${userMove}`);
console.log(`Computer move: ${ai.move}`);
console.log(`You ${userLoseMoves.includes(userMove) ? 'lose' : 'win'}.`);
// TODO: process draw case!
console.log(`HMAC secret: ${hashGenerator.secret}`);
