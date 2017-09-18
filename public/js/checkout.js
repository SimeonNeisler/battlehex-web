var this_js_file = $('script[src*=checkout]');
var cardsArr = this_js_file.attr('cart');

console.log(cardsArr);

$(document).ready(() => {
  $('#purchaseButton').click(() => {

    console.log("Button clicked");
    $.ajax({
      url: '/decks',
      type: 'POST',
      data: {
        cards: cardsArr
      },
      success: function(data) {
        console.log(data);
      }
    });
  });
});
