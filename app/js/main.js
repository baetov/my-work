$(document).ready(() => {

   let mycart = new Cart('js/getCart.json');
    $('.add-to-cart').click(e => {
        mycart._addProduct(e.target);
    });
    
    
    let feed = new Feedback('js/feedback.json');
});