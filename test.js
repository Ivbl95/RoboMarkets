const app = require('./app.js')
const assert = require('assert')
it('test getExchangeRate', () => {
    assert.equal(app.getExchangeRate("CAD", "USD"), 0.25)
})