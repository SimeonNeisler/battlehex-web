$(document).ready(() => {
  $("#CardType").on('change', () => {
    var type = $("#CardType").val();
    console.log(type);
    $(".variable").attr("disabled", true);
    $("." + type).attr("disabled", false);
  });
});
