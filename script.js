// create a class called "Time" that contains years, months, weeks, days, hours, minutes, seconds and milliseconds
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

    // add a method to the class that creates a string representation of the time
    // it should check if the time unit is 1 so it should not add the "s"
    toString() {
        let timeString = "";
        timeString += `${this.years} year${this.years != 1 ? "s" : ""}, `;
        timeString += `${this.months} month${this.months != 1 ? "s" : ""}, `;
        timeString += `${this.weeks} week${this.weeks != 1 ? "s" : ""}, `;
        timeString += `${this.days} day${this.days != 1 ? "s" : ""}, `;
        timeString += `${this.hours} hour${this.hours != 1 ? "s" : ""}, `;
        timeString += `${this.minutes} minute${this.minutes != 1 ? "s" : ""}, `;
        timeString += `${this.seconds} second${this.seconds != 1 ? "s" : ""}, `;
        timeString += `${this.milliseconds} millisecond${this.milliseconds != 1 ? "s" : ""
            }`;
        return timeString;
    }

    // add a method that adds two times together
    // it has to avoid exceeding the maximum value of every kind, so milliseconds should be added first
    // if the milliseconds exceed 1000, the milliseconds should be added to the seconds and then to the minutes
    // if the seconds exceed 60, the seconds should be added to the minutes and then to the hours
    // if the minutes exceed 60, the minutes should be added to the hours and then to the days
    // if the hours exceed 24, the hours should be added to the days and then to the weeks
    // if the days exceed 7, the days should be added to the weeks and then to the months
    // if the weeks exceed 4, the weeks should be added to the months and then to the years
    // if the months exceed 12, the months should be added to the years
    add(time) {
        // adds the time to the array inputHistory
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

        // fix milliseconds
        while (newTime.milliseconds >= 1000) {
            newTime.milliseconds -= 1000;
            newTime.seconds += 1;
        }
        // fix seconds
        while (newTime.seconds >= 60) {
            newTime.seconds -= 60;
            newTime.minutes += 1;
        }
        // fix minutes
        while (newTime.minutes >= 60) {
            newTime.minutes -= 60;
            newTime.hours += 1;
        }
        // fix hours
        while (newTime.hours >= 24) {
            newTime.hours -= 24;
            newTime.days += 1;
        }
        // fix days
        while (newTime.days >= 7) {
            newTime.days -= 7;
            newTime.weeks += 1;
        }
        // fix weeks
        while (newTime.weeks >= 4) {
            newTime.weeks -= 4;
            newTime.months += 1;
        }
        // fix months
        while (newTime.months >= 12) {
            newTime.months -= 12;
            newTime.years += 1;
        }

        return newTime;
    }

    // add a method that subtracts two times
    // it has to avoid exceeding the minimum value of every kind, so years should be subtracted first
    // if the years are below 0, the years should be subtracted from the months and then from the weeks
    // if the months are below 0, the months should be subtracted from the weeks and then from the days
    // if the weeks are below 0, the weeks should be subtracted from the days and then from the hours
    // if the days are below 0, the days should be subtracted from the hours and then from the minutes
    // if the hours are below 0, the hours should be subtracted from the minutes and then from the seconds
    // if the minutes are below 0, the minutes should be subtracted from the seconds and then from the milliseconds
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

        // fix milliseconds
        while (newTime.milliseconds < 0) {
            newTime.milliseconds += 1000;
            newTime.seconds -= 1;
        }
        // fix seconds
        while (newTime.seconds < 0) {
            newTime.seconds += 60;
            newTime.minutes -= 1;
        }
        // fix minutes
        while (newTime.minutes < 0) {
            newTime.minutes += 60;
            newTime.hours -= 1;
        }
        // fix hours
        while (newTime.hours < 0) {
            newTime.hours += 24;
            newTime.days -= 1;
        }
        // fix days
        while (newTime.days < 0) {
            newTime.days += 7;
            newTime.weeks -= 1;
        }
        // fix weeks
        while (newTime.weeks < 0) {
            newTime.weeks += 4;
            newTime.months -= 1;
        }
        // fix months
        while (newTime.months < 0) {
            newTime.months += 12;
            newTime.years -= 1;
        }

        return newTime;
    }
}

// create a total time initialized to zero
let totalTime = new Time(0, 0, 0, 0, 0, 0, 0, 0);

// create a list of previous inputs
let inputHistory = [];

// prints it initially on the webpage
document.getElementById("result").innerHTML = totalTime.toString();

// add an event listener to the button that adds the time to the total time
document.getElementById("add").addEventListener("click", () => {
    let time = new Time(
        Number(document.getElementById("years").value),
        Number(document.getElementById("months").value),
        Number(document.getElementById("weeks").value),
        Number(document.getElementById("days").value),
        Number(document.getElementById("hours").value),
        Number(document.getElementById("minutes").value),
        Number(document.getElementById("seconds").value),
        Number(document.getElementById("milliseconds").value),
    );

    // resets the input fields
    document.getElementById("years").value = "";
    document.getElementById("months").value = "";
    document.getElementById("weeks").value = "";
    document.getElementById("days").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    document.getElementById("milliseconds").value = "";

    // substitutes the total time with the new time (which is the result of the sum of the two times)
    totalTime = totalTime.add(time);

    // prints the inputHistory on the webpage as different <p></p>
    document.getElementById("input-history").innerHTML = "";
    for (let i = 0; i < inputHistory.length; i++) {
        document.getElementById(
            "input-history",
        ).innerHTML += `<p class="input">• ${inputHistory[
            inputHistory.length - 1 - i
        ].toString()}</p>`;
    }

    // prints the total time on the webpage
    document.getElementById("result").innerHTML = totalTime.toString();
});

// adds an event listener to the document that checks if a key was pressed
document.addEventListener("keydown", (event) => {
    // checks if the pressed key was the "Enter" key
    if (event.key == "Enter") {
        // checks if the input fields are empty
        if (
            !(
                document.getElementById("years").value == "" &&
                document.getElementById("months").value == "" &&
                document.getElementById("weeks").value == "" &&
                document.getElementById("days").value == "" &&
                document.getElementById("hours").value == "" &&
                document.getElementById("minutes").value == "" &&
                document.getElementById("seconds").value == "" &&
                document.getElementById("milliseconds").value == ""
            )
        ) {
            // clicks the "Add" button
            document.getElementById("add").click();
        }
    }
    // if the pressed key was the "y" key
    else if (event.key == "y") {
        // selects the "years" input field
        document.getElementById("years").focus();
    }
    // if the pressed key was the "m" key
    else if (event.key == "m") {
        // if the "months" input field is focused
        // get the document's activeElement
        let activeElement = document.activeElement;

        if (
            activeElement.id == "months" ||
            activeElement.id == "weeks" ||
            activeElement.id == "days" ||
            activeElement.id == "hours"
        ) {
            // selects the "minutes" input field
            document.getElementById("minutes").focus();
        } else if (activeElement.id == "minutes" || activeElement.id == "seconds") {
            // selects the "milliseconds" input field
            document.getElementById("milliseconds").focus();
        } else {
            // selects the "months" input field
            document.getElementById("months").focus();
        }
    }
    // if the pressed key was the "w" key
    else if (event.key == "w") {
        // selects the "weeks" input field
        document.getElementById("weeks").focus();
    }
    // if the pressed key was the "d" key
    else if (event.key == "d") {
        // selects the "days" input field
        document.getElementById("days").focus();
    }
    // if the pressed key was the "h" key
    else if (event.key == "h") {
        // selects the "hours" input field
        document.getElementById("hours").focus();
    }
    // if the pressed key was the "s" key
    else if (event.key == "s") {
        // selects the "seconds" input field
        document.getElementById("seconds").focus();
    }
});

// add event listener that checks for the "reset" button
document.getElementById("reset").addEventListener("click", () => {
    // it empties the input history
    inputHistory = [];
    document.getElementById("input-history").innerHTML = "";

    // it resets the total time
    totalTime = new Time(0, 0, 0, 0, 0, 0, 0, 0);
    document.getElementById("result").innerHTML = totalTime.toString();
});

// add event listener that checks for the "clear" button
document.getElementById("clear").addEventListener("click", () => {
    // empties the input fields
    document.getElementById("years").value = "";
    document.getElementById("months").value = "";
    document.getElementById("weeks").value = "";
    document.getElementById("days").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    document.getElementById("milliseconds").value = "";
});

// add event listener that checks for the "clear last" button
document.getElementById("reset-last").addEventListener("click", () => {
    // removes the last input from the input history
    inputToRemove = inputHistory.pop();
    totalTime = totalTime.subtract(inputToRemove);

    // prints the inputHistory on the webpage as different <p></p>
    document.getElementById("input-history").innerHTML = "";
    for (let i = 0; i < inputHistory.length; i++) {
        document.getElementById(
            "input-history",
        ).innerHTML += `<p class="input">• ${inputHistory[
            inputHistory.length - 1 - i
        ].toString()}</p>`;
    }
    document.getElementById("result").innerHTML = totalTime.toString();
});

// add an event listener to the button that subtracts the time to the total time
document.getElementById("subtract").addEventListener("click", () => {
    // gets the time from the input fields
    let time = new Time(
        document.getElementById("years").value,
        document.getElementById("months").value,
        document.getElementById("weeks").value,
        document.getElementById("days").value,
        document.getElementById("hours").value,
        document.getElementById("minutes").value,
        document.getElementById("seconds").value,
        document.getElementById("milliseconds").value,
    );

    // empties the input fields
    document.getElementById("years").value = "";
    document.getElementById("months").value = "";
    document.getElementById("weeks").value = "";
    document.getElementById("days").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    document.getElementById("milliseconds").value = "";

    // substitutes the total time with the new time (which is the result of the sum of the two times)
    totalTime = totalTime.subtract(time);

    // inverts the value of the time attributes
    time.years = -time.years;
    time.months = -time.months;
    time.weeks = -time.weeks;
    time.days = -time.days;
    time.hours = -time.hours;
    time.minutes = -time.minutes;
    time.seconds = -time.seconds;
    time.milliseconds = -time.milliseconds;

    // adds the time to the input history
    inputHistory.push(time);

    // prints the inputHistory on the webpage as different <p></p>
    document.getElementById("input-history").innerHTML = "";
    for (let i = 0; i < inputHistory.length; i++) {
        document.getElementById(
            "input-history",
        ).innerHTML += `<p class="input">• ${inputHistory[
            inputHistory.length - 1 - i
        ].toString()}</p>`;
    }

    // prints the total time on the webpage
    document.getElementById("result").innerHTML = totalTime.toString();
});