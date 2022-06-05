function resetFields() {
    document.getElementById("years").value = "";
    document.getElementById("months").value = "";
    document.getElementById("weeks").value = "";
    document.getElementById("days").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    document.getElementById("milliseconds").value = "";
}

// create a class called "Time" that contains years, months, weeks, days, hours, minutes, seconds and milliseconds

function fixedTime(time) {
    // fix milliseconds
    while (time.milliseconds < 0) {
        time.milliseconds += 1000;
        time.seconds -= 1;
    }
    // fix seconds
    while (time.seconds < 0) {
        time.seconds += 60;
        time.minutes -= 1;
    }
    // fix minutes
    while (time.minutes < 0) {
        time.minutes += 60;
        time.hours -= 1;
    }
    // fix hours
    while (time.hours < 0) {
        time.hours += 24;
        time.days -= 1;
    }
    // fix days
    while (time.days < 0) {
        time.days += 7;
        time.weeks -= 1;
    }
    // fix weeks
    while (time.weeks < 0) {
        time.weeks += 4;
        time.months -= 1;
    }
    // fix months
    while (time.months < 0) {
        time.months += 12;
        time.years -= 1;
    }

    // fix milliseconds
    while (time.milliseconds >= 1000) {
        time.milliseconds -= 1000;
        time.seconds += 1;
    }
    // fix seconds
    while (time.seconds >= 60) {
        time.seconds -= 60;
        time.minutes += 1;
    }
    // fix minutes
    while (time.minutes >= 60) {
        time.minutes -= 60;
        time.hours += 1;
    }
    // fix hours
    while (time.hours >= 24) {
        time.hours -= 24;
        time.days += 1;
    }
    // fix days
    while (time.days >= 7) {
        time.days -= 7;
        time.weeks += 1;
    }
    // fix weeks
    while (time.weeks >= 4) {
        time.weeks -= 4;
        time.months += 1;
    }
    // fix months
    while (time.months >= 12) {
        time.months -= 12;
        time.years += 1;
    }

    return time;
}

class Time {
    constructor(
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
    ) {
        this.years = years;
        this.months = months;
        this.weeks = weeks;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
    }

    static emptyTime() {
        return new Time(0, 0, 0, 0, 0, 0, 0, 0);
    }

    toString() {
        return `${this.years} year${this.years != 1 ? "s" : ""}, ` +
            `${this.months} month${this.months != 1 ? "s" : ""}, ` +
            `${this.weeks} week${this.weeks != 1 ? "s" : ""}, ` +
            `${this.days} day${this.days != 1 ? "s" : ""}, ` +
            `${this.hours} hour${this.hours != 1 ? "s" : ""}, ` +
            `${this.minutes} minute${this.minutes != 1 ? "s" : ""}, ` +
            `${this.seconds} second${this.seconds != 1 ? "s" : ""}, ` +
            `${this.milliseconds} millisecond${this.milliseconds != 1 ? "s" : ""}`;
    }

    add(time) {
        inputHistory.push(time);

        let newTime = new Time(
            this.years + time.years,
            this.months + time.months,
            this.weeks + time.weeks,
            this.days + time.days,
            this.hours + time.hours,
            this.minutes + time.minutes,
            this.seconds + time.seconds,
            this.milliseconds + time.milliseconds,
        );

        return fixedTime(newTime);
    }

    subtract(time) {
        let newTime = new Time(
            this.years - time.years,
            this.months - time.months,
            this.weeks - time.weeks,
            this.days - time.days,
            this.hours - time.hours,
            this.minutes - time.minutes,
            this.seconds - time.seconds,
            this.milliseconds - time.milliseconds,
        );

        return fixedTime(newTime);
    }

    negative() {
        let negativeTime = new Time(
            this.years = -this.years,
            this.months = -this.months,
            this.weeks = -this.weeks,
            this.days = -this.days,
            this.hours = -this.hours,
            this.minutes = -this.minutes,
            this.seconds = -this.seconds,
            this.milliseconds = -this.milliseconds
        )
        return negativeTime;
    }
}

let totalTime = Time.emptyTime();
let inputHistory = [];
updateResult(totalTime);

document.getElementById("add").addEventListener("click", () => {
    if (checkInputs()) {
        let time = getInputTime();
        resetFields();
        totalTime = totalTime.add(time);
        updateHistory()
        updateResult(totalTime);
    }
});

document.getElementById("subtract").addEventListener("click", () => {
    if (checkInputs()) {
        let time = getInputTime();
        resetFields();
        totalTime = totalTime.subtract(time);
        inputHistory.push(time.negative());
        updateHistory()
        updateResult(totalTime);
    }
});

document.getElementById("clear").addEventListener("click", () => {
    resetFields();
});

document.getElementById("undo").addEventListener("click", () => {
    inputToRemove = inputHistory.pop();
    totalTime = totalTime.subtract(inputToRemove);
    updateHistory()
    updateResult(totalTime);
});

document.getElementById("reset").addEventListener("click", () => {
    inputHistory = [];
    updateHistory();
    totalTime = Time.emptyTime();
    updateResult(totalTime);
});

function getInputTime() {
    return new Time(
        Number(document.getElementById("years").value),
        Number(document.getElementById("months").value),
        Number(document.getElementById("weeks").value),
        Number(document.getElementById("days").value),
        Number(document.getElementById("hours").value),
        Number(document.getElementById("minutes").value),
        Number(document.getElementById("seconds").value),
        Number(document.getElementById("milliseconds").value),
    );
}

function checkInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "number" && inputs[i].value != "") {
            return true;
        }
    }
    return false;
}

function updateResult(time) {
    document.getElementById("result").innerHTML = time.toString();
}

function updateHistory() {
    document.getElementById("input-history").innerHTML = "";
    for (let i = 0; i < inputHistory.length; i++) {
        document.getElementById(
            "input-history",
        ).innerHTML += `<p class="input">• ${inputHistory[
            inputHistory.length - 1 - i
        ].toString()}</p>`;
    }
}