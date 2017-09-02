$(document).ready(() => {
  $("#unitButton").click(() => {
    $("#unitCards").toggleClass('closed');
    $("#unitButton .rotate").toggleClass('down');
  });
  $("#instaButton").click(() => {
    $("#instaCards").toggleClass('closed');
    $("#instaButton .rotate").toggleClass('down');
  });
  $("#upgradeButton").click(() => {
    $("#upgradeCards").toggleClass('closed');
    $("#upgradeButton .rotate").toggleClass('down');
  });
});
