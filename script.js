// Declaring global objects
// holds time in military format
const currentHour = moment().format('HH[00]');

const hours24 = [];
// adds 24 hour blocks to hours 24 array
for (let i = 0; i < 24; i++) {
    hours24.push(i.toString().padStart(2, '0') + "00")
}

const hours12 = [];

// adds 12 hour blocks to hours 12 array
// Loop to generate numbers into hours12 array
for (let i = 0; i < 12; i++) {
    hours12.push(i + 1);
}


// update html with current time
function updateTime() {
    const date = moment().format('MMMM Do YYYY, h:mm:ss A');
    $("#date").text(date);
}

// interval timer running the calender and clock
updateTime();
setInterval(function() {
    updateTime();
}, 1000);

// This function generates an hour-block element
function generateHours(array) {
    // commented line below is another way to check if local storage has been set
    // const tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : false

    // checks if local storage has been set
    let tasks;
    if (localStorage.tasks) tasks = JSON.parse(localStorage.tasks)
    else tasks = false
    // loops through an array and creates entire hour block element
    for (let i = 0; i < array.length; i++) {
        const hourBlock = $("<div>").addClass("hour");
        hourBlock.append($("<span>").addClass("hour-label").text(array[i]));
        hourBlock.append($("<textarea>").attr({id: "hour" + i, cols: "30", rows: "1", placeholder: tasks ? tasks[i] : ""}));
        // Conditional checks if local storage is made and appends the text in textarea to the placeholder
        if (tasks && tasks[i] !== "") {
            hourBlock.append($("<button>").addClass("remove-button").click(clearPlaceholder).text("Remove"));
        }
        // appends newly made hour block to main-content container
        $(".main-content").append(hourBlock);
        // this block of code checks the time in hour-label and changes the textarea background-color as neccessary
        const hourLabel = hourBlock.children(".hour-label").text()
        const hourBackground = hourBlock.children("textarea");
        if (hourLabel < currentHour) {hourBackground.css("background-color", "grey")}
        else if (hourLabel > currentHour) {hourBackground.css("background-color", "seagreen")}
        else {hourBackground.css("background-color", "indianred")}
    }
}
// this function clears a specific placeholder in textarea
function clearPlaceholder() {
    $(this).siblings("textarea").attr("placeholder", "");
    $(this).remove();
    updatePlanner(hours24);
}
// This function is used to update the entire planner if changes have been made
function updatePlanner(array) {
    const toLocalStorage = [];
    for (let i = 0; i < array.length; i++) {
        const textArea = $("#hour" + i);
        const task = textArea.val();
        // this conditional clears the placeholder if the task storage is empty
        if (task !== "") {
            // this conditional adds a remove button if the element has data in it
            if (textArea.attr("placeholder") === "") {
                textArea.parent().append($("<button>").addClass("remove-button").click(clearPlaceholder).text("Remove"));
            }
            textArea.attr("placeholder", task);
            textArea.val("");
        }   // push any changed data to local storage
        toLocalStorage.push(textArea.attr("placeholder"));
    }   // Stringify local storage
    localStorage.tasks = JSON.stringify(toLocalStorage)
}
// adding function to update button
$("#update-button").click(() => updatePlanner(hours24));
// adding function to clear button
$("#clear-button").click(function() {
    $(".main-content").find(".hour").find("textarea").attr("placeholder", "");
    $(".main-content").find(".hour").find("button").remove();
    updatePlanner(hours24);
});
// this loads the hour blocks on page load
generateHours(hours24)