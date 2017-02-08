const assert = require('assert')
const generateCalender = require('../src/utils/gen-calender')

describe('generateCalender', () => {
  let date = new Date()
  beforeEach(() => {
    date.setUTCFullYear(2017)
    date.setUTCMonth(1)
    date.setUTCDate(8)
    date.setUTCHours(3)
    date.setUTCSeconds(0)
    date.setUTCMinutes(0)
    date.setUTCMilliseconds(0)
  })

  it('is a list?', () => {
    let calender = generateCalender(5)
    assert.ok(Array.isArray(calender))
  })

  it('array length', () => {
    let calender = generateCalender(5)
    assert.equal(calender.length, 5)
  })

  it('day', () => {
    assert.deepEqual(
      generateCalender(5, date).map(e => e.day), [
        "2/8", "2/7", "2/6", "2/3", "2/2"
      ]
    )
  })

  it('day (not yet announced)', () => {
    date.setUTCDate(9)
    date.setUTCHours(0)
    assert.deepEqual(
      generateCalender(5, date).map(e => e.day), [
        "2/8", "2/7", "2/6", "2/3", "2/2"
      ]
    )
  })

  it('query', () => {
    assert.deepEqual(
      generateCalender(5, date).map(e => e.query), [
        "20170206190000+TO+20170207190000",
        "20170203190000+TO+20170206190000",
        "20170202190000+TO+20170203190000",
        "20170201190000+TO+20170202190000",
        "20170131190000+TO+20170201190000"
      ]
    )
  })

  it('query (not yet announced)', () => {
    date.setUTCDate(9)
    date.setUTCHours(0)
    assert.deepEqual(
      generateCalender(5, date).map(e => e.query), [
        "20170206190000+TO+20170207190000",
        "20170203190000+TO+20170206190000",
        "20170202190000+TO+20170203190000",
        "20170201190000+TO+20170202190000",
        "20170131190000+TO+20170201190000"
      ]
    )
  })
})
