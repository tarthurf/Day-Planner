// Declaring global objects
const hours24 = ["0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];

const hours12 = [];

// Loop to generate numbers into hours12 array
for (let i = 0; i < 12; i++) {
    hours12.push(i + 1);
}

// This function generates an hour-block element
function generateHours(array) {
    const hourBlock = $("<form>").addClass("hour");
    hourBlock.append($("<span>").addClass("hour-label").text(array[i]));
    hourBlock.append($("<textarea>").attr({id: "hour" + i ,cols: "30", rows: "1"}));
    hourBlock.append($("<button>").text("Update"));
    $(".main-content").append(hourBlock)
}

// TODO: create local storage to save the hour blocks
// TODO: create functional update buttons that save the hour block text to local storage
// 