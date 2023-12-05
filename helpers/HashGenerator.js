import { randomBytes, createHmac } from 'crypto';

export default class HashGenerator {
  constructor(message) {
    this._secret = randomBytes(256).toString('hex');
    this._hmac = createHmac('sha512', this._secret).update(message).digest('hex');
  }

  get secret() {
    return this._secret;
  }

  get hmac() {
    return this._hmac;
  }

}
