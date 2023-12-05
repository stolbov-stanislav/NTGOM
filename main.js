const { randomBytes, createHmac } = require('crypto');

const args = process.argv.slice(2);

const argsError = (args.length < 3) || (args.length % 2 === 0) || (args.length !== new Set(args).size);
if (argsError) {
  // TODO: process hint output.
  console.log('You must pass 3 or more odd non-repeating arguments!');
}

const secret = randomBytes(256).toString('hex');

const computerMove = args[Math.floor(Math.random() * args.length)];

const userLoseMoves = [];
const userDrawMove = computerMove;
const half = (args.length - 1) / 2;
const computerMoveIndex = args.indexOf(computerMove);
for (let shift = 1; shift <= half; shift++) {
  userLoseMoves.push(args.at(computerMoveIndex - shift));
}
const userWinMoves = args.filter((arg) => (arg !== userDrawMove) && (!userLoseMoves.includes(arg)));
console.log('userWinMoves', userWinMoves);
console.log('userLoseMoves', userLoseMoves);
console.log('userDrawMove', userDrawMove);
console.log('half', half);
console.log('computerMoveIndex', computerMoveIndex);

const hmac = createHmac('sha512', secret).digest('hex');

console.log('args', args);
console.log('secret', secret);
console.log('computerMove', computerMove);
console.log('hmac', hmac);
