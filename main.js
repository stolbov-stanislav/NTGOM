const { randomBytes } = require('crypto');

const args = process.argv.slice(2);

const argsError = (args.length < 3) || (args.length % 2 === 0) || (args.length !== new Set(args).size);
if (argsError) {
  // TODO: process hint output.
  console.log('You must pass 3 or more odd non-repeating arguments!');
}

const secret = randomBytes(256).toString('hex');

console.log('args', args);
console.log('secret', secret);

