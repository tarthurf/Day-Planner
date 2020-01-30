// Declaring global objects
const hours24 = ["0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];

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
        hourBlock.append($("<button>").click(clearPlaceholder).text("Remove"));
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