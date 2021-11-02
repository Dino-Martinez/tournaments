const validators = {
  /** The result of all chained validations */
  result: false,

  /** The value to be validated */
  value: null,

  /** Properties that can be validated */
  minLength: null,
  maxLength: null,
  isEmail: false,
  isPhoneNumber: false,
  isDate: false,
  isPassword: false,

  /** Chainable validation functions */

  /**
   * Flag validation context to check length of value
   * @param {number} min - The minimum length value can have. Defaults to 0
   * @param {number} max - The maximum length value can have. Defaults to POSITIVE_INFINITY
   * @returns The validation context
   */
  length: function (min = 0, max = Number.POSITIVE_INFINITY) {
    this.minLength = min
    this.maxLength = max
    return this
  },

  email: function () {
    this.isEmail = true
  },

  password: function () {
    this.isPassword = true
  },

  phoneNumber: function () {
    this.isPhoneNumber = true
  },

  date: function () {
    this.isDate = true
  },

  /** Execution of validation against modified validation properties */
  validateLength: function (value) {
    this.result = value.length >= this.minLength && value.length <= this.maxLength
  },

  validateFormat: function (value) {
    if (this.isDate) this.result = !isNaN(Date.parse(value))

    if (this.isEmail) this.result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)

    if (this.isPhoneNumber) this.result = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)
  },

  /** Master function that executes all necessary validators */
  validate: function (value) {
    this.validateLength(value)
    return this.result
  }
}

console.log(validators.length(5, 7).validate('yoyoyoyoyo'))
