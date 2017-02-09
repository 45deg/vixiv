const assert = require('assert')
const calender = require('../src/utils/calender')

const generateCalender = calender.generateCalender
const getArxivQuery = calender.getArxivQuery

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

  it('label', () => {
    assert.deepEqual(
      generateCalender(5, date).map(e => e.label), [
        "2/8", "2/7", "2/6", "2/3", "2/2"
      ]
    )
  })

  it('label (not yet announced)', () => {
    date.setUTCDate(9)
    date.setUTCHours(0)
    assert.deepEqual(
      generateCalender(5, date).map(e => e.label), [
        "2/8", "2/7", "2/6", "2/3", "2/2"
      ]
    )
  })

  it('day', () => {
    assert.deepEqual(
      generateCalender(5, date).map(e => e.day), [
        "20170208", "20170207", "20170206", "20170203", "20170202"
      ]
    )
  })

  it('day (not yet announced)', () => {
    date.setUTCDate(9)
    date.setUTCHours(0)
    assert.deepEqual(
      generateCalender(5, date).map(e => e.day), [
        "20170208", "20170207", "20170206", "20170203", "20170202"
      ]
    )
  })
})


describe('getArxivQuery', () => {
  let date = new Date()

  it('normal', () => {
    assert.equal(getArxivQuery("20170208"), "20170206190000 TO 20170207190000")
  })

  it('over weekends', () => {
    assert.equal(getArxivQuery("20170207"), "20170203190000 TO 20170206190000")
  })

  it('across month', () => {
    assert.equal(getArxivQuery("20170202"), "20170131190000 TO 20170201190000")
  })
})
