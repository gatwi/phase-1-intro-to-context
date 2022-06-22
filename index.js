// // Your code here
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[0],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

var createTimeInEvent = function(employee, dateStamp){
    var [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

var createTimeOutEvent = function(employee, dateStamp){
    var [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

var hoursWorkedOnDate = function(employee, soughtDate){
    var inEvent = employee.timeInEvents.find(function(e){
        return e.date == soughtDate
    })

    var outEvent = employee.timeOutEvents.find(function(e){
        return e.date == soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

var wagesEarnedOnDate = function(employee, dateSought){
    var rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

var allWagesFor = function(employee){
    var eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    var payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

var findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName == firstName
  })
}

var calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}