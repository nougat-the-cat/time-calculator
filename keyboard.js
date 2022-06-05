document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        document.getElementById("add").click();
    } else if (event.key == "y") {
        document.getElementById("years").focus();
    } else if (event.key == "m") {
        let activeElement = document.activeElement;

        if (
            activeElement.id == "months" ||
            activeElement.id == "weeks" ||
            activeElement.id == "days" ||
            activeElement.id == "hours"
        ) {
            document.getElementById("minutes").focus();
        } else if (activeElement.id == "minutes" || activeElement.id == "seconds") {
            document.getElementById("milliseconds").focus();
        } else {
            document.getElementById("months").focus();
        }
    } else if (event.key == "w") {
        document.getElementById("weeks").focus();
    } else if (event.key == "d") {
        document.getElementById("days").focus();
    } else if (event.key == "h") {
        document.getElementById("hours").focus();
    } else if (event.key == "s") {
        document.getElementById("seconds").focus();
    } else if (event.key == "u") {
        document.getElementById("undo").click();
    } else if (event.key == "r") {
        document.getElementById("reset").click();
    }
});