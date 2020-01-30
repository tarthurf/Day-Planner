// Declaring global objects
const hours24 = ["0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"];

const hours12 = [];

// Loop to generate numbers into hours12 array
for (let i = 0; i < 12; i++) {
    hours12.push(i + 1);
}

// creating object to create entire element to be used in a function
// TODO: Put this sucker in a function!
const hourBlock = $("<form>").addClass("hour");
hourBlock.append($("<span>").addClass("hour-label").text("1:00"));
hourBlock.append($("<textarea>").attr({id: "", cols: "30", rows: "1"}));
hourBlock.append($("<button>").text("Update"));
// $(".main-content").append(hourBlock)
