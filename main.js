const { randomBytes, createHmac } = require('crypto');
const readlineSync = require('readline-sync');

const args = process.argv.slice(2);

const argsError = (args.length < 3) || (args.length % 2 === 0) || (args.length !== new Set(args).size);
if (argsError) {
  // TODO: process hint output.
  console.log('You must pass 3 or more odd non-repeating arguments!');
}

const secret = randomBytes(256).toString('hex');

const computerMove = args[Math.floor(Math.random() * args.length)];

const userLoseMoves = [];
const half = (args.length - 1) / 2;
const computerMoveIndex = args.indexOf(computerMove);
for (let shift = 1; shift <= half; shift++) {
  userLoseMoves.push(args.at(computerMoveIndex - shift));
}
console.log('userLoseMoves', userLoseMoves);
console.log('half', half);
console.log('computerMoveIndex', computerMoveIndex);

const hmac = createHmac('sha512', secret).update(computerMove).digest('hex');

console.log('args', args);
console.log('secret', secret);
console.log('computerMove', computerMove);
console.log('hmac', hmac);

function drawMenu(items) {
  items.forEach((item, i) => {
    console.log(`${i + 1} - ${item}`);
  });
  console.log('0 - exit');
  console.log('? - help');
}

drawMenu(args);

function askForMove() {
  return readlineSync.question('Enter your move: ');
}

const userMove = askForMove();

console.log(`Your move: ${userMove}`);
console.log(`Computer move: ${computerMove}`);
console.log(`You ${userLoseMoves.includes(userMove) ? 'lose' : 'win'}.`);
// TODO: process draw case!
console.log(`HMAC secret: ${secret}`);
