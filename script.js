// Declaring global objects
const hours24 = [];

for (let i = 0; i < 24; i++) {
	hours24.push(i.toString().padStart(2, '0') + "00")
}

const hours12 = [];

// Loop to generate numbers into hours12 array
for (let i = 0; i < 12; i++) {
    hours12.push(i + 1);
}

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
        hourBlock.append($("<button>").attr("class", "remove-button").click(clearPlaceholder).text("Remove"));
      }
      $(".main-content").append(hourBlock);
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
            textArea.parent().append($("<button>").click(clearPlaceholder).text("Remove"));
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

// console.log(moment('0100', 'HH').format('HHmm'))
// console.log(moment('01/25/2020', 'MM/DD/YYYY').format('hh:mmA'))
// TODO: monspace font for hour-label
