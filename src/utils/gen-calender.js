/*
Submission Freeze Time Table (since 28 Nov 2016)

Submissions Received Between      | Will Be Announced (UTC)
==================================+========================
Monday    19:00 - Tuesday   19:00 | Wednesday 01:00
Tuesday   19:00 - Wednesday 19:00 | Thursday  01:00
Wednesday 19:00 - Thursday  19:00 | Friday    01:00
Thursday  19:00 - Friday    19:00 | Monday    01:00
Friday    19:00 - Monday    19:00 | Tuesday   01:00

Announced Delayed: One Hour?
*/

const UPDATE_HOUR   = 2
const DEADLINE_HOUR = 19

function zeroPad(num, length){
  let numstring = num.toString()
  let zeros = ''
  for(let i = 0; i < length - numstring.length; i++) {
    zeros += '0'
  }
  return zeros + numstring
}

function getCanonicalDate(date){
  return '' + date.getUTCFullYear()
            + zeroPad(date.getUTCMonth() + 1, 2)
            + zeroPad(date.getUTCDate(), 2)
}

function getPreviousDay(date){
  let temp = new Date(date)
  do {
    temp.setUTCDate(temp.getUTCDate() - 1)
  } while(isHoliday(temp))
  return temp
}

function isHoliday(date){
  let day = date.getUTCDay()
  return day === 0 || day === 6
}

function generateCalender(number, date = new Date()){
  let targetDate = (date.getUTCHours() < UPDATE_HOUR) ? getPreviousDay(date)
                                                      : new Date(date)
  let calender = []
  const TIME = `${DEADLINE_HOUR}0000`
  for (let i = 0; i < number; i++) {
    let targetDateString = targetDate.getUTCMonth() + 1 + '/' +
                           targetDate.getUTCDate()
    let from = getPreviousDay(targetDate)
    let to   = getPreviousDay(from)
    calender.push({
        day: targetDateString,
      query: getCanonicalDate(to)   + TIME + '+TO+' +
             getCanonicalDate(from) + TIME
    })
    targetDate = getPreviousDay(targetDate)
  }
  return calender
}

module.exports = generateCalender;
