import Currency from './3-currency';

export default class Pricing {
  constructor(amount, currency) {
    if (typeof amount !== 'number') {
      throw TypeError('Amount must be a number');
    }
    if (!(currency instanceof Currency)) {
      throw TypeError('Currency must be a prototype of Currency');
    }

    this._amount = amount;
    this._currency = currency;
  }

  // getter and setter for amount
  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount = value;
  }

  // getter and setter for currency
  get currency() {
    return this._currency;
  }

  set currency(value) {
    this._currency = value;
  }

  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }

  static convertPrice(amount, conversionRate) {
    return amount * conversionRate;
  }
}
