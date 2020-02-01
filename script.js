// Declaring global objects
const currentHour = moment().format('HH[00]');

const hours24 = [];

for (let i = 0; i < 24; i++) {
	hours24.push(i.toString().padStart(2, '0') + "00")
}

const hours12 = [];

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
    // TODO: look up ternary operators or rewrite so it makes sense, dummy
    // const tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : false
    let tasks;
    if (localStorage.tasks) tasks = JSON.parse(localStorage.tasks)
    else tasks = false
    for (let i = 0; i < array.length; i++) {
        const hourBlock = $("<div>").addClass("hour");
        hourBlock.append($("<span>").addClass("hour-label").text(array[i]));
        hourBlock.append($("<textarea>").attr({id: "hour" + i, cols: "30", rows: "1", placeholder: tasks ? tasks[i] : ""}));
        if (tasks && tasks[i] !== "") {
            hourBlock.append($("<button>").addClass("remove-button").click(clearPlaceholder).text("Remove"));
        }
        $(".main-content").append(hourBlock);
        const hourLabel = hourBlock.children(".hour-label").text()
        const hourBackground = hourBlock.children("textarea");
        if (hourLabel < currentHour) {hourBackground.css("background-color", "grey")}
        else if (hourLabel > currentHour) {hourBackground.css("background-color", "seagreen")}
        else {hourBackground.css("background-color", "indianred")}
    }
}

function clearPlaceholder() {
    $(this).siblings("textarea").attr("placeholder", "");
    $(this).remove();
    updatePlanner(hours24);
}

function updatePlanner(array) {
    const toLocalStorage = [];
    for (let i = 0; i < array.length; i++) {
        const textArea = $("#hour" + i);
        const task = textArea.val();
        if (task !== "") {
            if (textArea.attr("placeholder") === "") {
                textArea.parent().append($("<button>").addClass("remove-button").click(clearPlaceholder).text("Remove"));
            }
            textArea.attr("placeholder", task);
            textArea.val("");
        }
        toLocalStorage.push(textArea.attr("placeholder"));
    }
    localStorage.tasks = JSON.stringify(toLocalStorage)
}

$("#update-button").click(() => updatePlanner(hours24));

$("#clear-button").click(function() {
    $(".main-content").find(".hour").find("textarea").attr("placeholder", "");
    $(".main-content").find(".hour").find("button").remove();
    updatePlanner(hours24);
});

generateHours(hours24)




// function testColorUpdate(array) {
//     for (let i = 0; i < array.length; i++) {
//         const element = array[i];
        
//     }
//     if $(".main-content").find(".hour").
//     }
// }
// testColorUpdate(hours24)

// console.log(moment('0100', 'HH').format('HHmm'))
// console.log(moment('01/25/2020', 'MM/DD/YYYY').format('HHmm'))
// TODO: Add date and clock to top of app