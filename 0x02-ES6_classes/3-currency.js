export default class Currency {
  constructor(code, name) {
    // validate data types
    if (typeof name !== 'string') {
      throw TypeError('Nmae must be string');
    }
    if (typeof code !== 'string') {
      throw TypeError('Code must be a string');
    }

    // instantiate a class
    this._name = name;
    this._code = code;
  }

  // getter  and setter for code attribute
  get code() {
    return this._code;
  }

  set code(value) {
    if (typeof value !== 'string') {
      throw TypeError('Code must be a string');
    }
    this._code = value;
  }

  // getters and setter for name attribute
  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string') {
      throw TypeError('Name must be a string');
    }
    this._name = value;
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
