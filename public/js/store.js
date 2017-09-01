$(document).ready(() => {
  $("#unitButton").click(function() {
    $("#unitContent").toggleClass('closed');
    $(".rotate").toggleClass('down')
  });
});
