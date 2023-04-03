function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(object, timestamp) {
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(timestamp.slice(-4)),
        date: timestamp.slice(0, 10)
    }
    object.timeInEvents.push(timeInObj);
    return object;
}

function createTimeOutEvent(object, timestamp) {
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(timestamp.slice(-4)),
        date: timestamp.slice(0, 10)
    }
    object.timeOutEvents.push(timeOutObj);
    return object;
}

function hoursWorkedOnDate(record, dateArg) {
    const timeIn = record.timeInEvents.find((e) => e.date === dateArg).hour;
    const timeOut = record.timeOutEvents.find((e) => e.date === dateArg).hour;
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(record, dateArg) {
    return hoursWorkedOnDate(record, dateArg) * record.payPerHour;
}

function allWagesFor(record) {
    const allWages = record.timeInEvents.map((day) => {return wagesEarnedOnDate(record, day.date)});
    return allWages.reduce((acc, cv) => acc + cv);
}

function calculatePayroll(employees) {
    const totalPay = employees.map((employee) => {return allWagesFor(employee)});
    return totalPay.reduce((acc, cv) => acc + cv);
}