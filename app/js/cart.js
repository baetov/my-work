class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; // Общая сумма
        this.cartItems = []; //Все товары в корзине
        this._init(this.source);
    }
    _render(){

        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-amount'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });

        $cartItemsDiv.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
        $totalAmount.append($(`<p></p>`)).append($(`<span></span>`));
        $totalPrice.append($(`<p></p>`)).append($(`<span></span>`));
    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        let $delBtn = $('<div class="del-btn"><i class="far fa-times-circle"></i></div>');
        $container.append($(`<div class="cart-img"><img src="${product.productImg}" alt="some"></div>`));
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}шт.</p>`));
        $container.append($(`<p class="product-price">${product.price} $.</p>`));
        $container.append($delBtn);

        $delBtn.click(() => {
           this._remove(product.id_product);
        });
        $('.cart-items-wrap').append($container);
    }
    _renderSum(amount, countGoods){
        $('.sum-amount > p').text('Всего товаров в корзине');
        $('.sum-amount > span').text(`${countGoods}`);
        $('.sum-price > p').text('Общая сумма');
        $('.sum-price > span').text(`${amount} $`);

    }
    _init(source){
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum(data.amount, data.countGoods);
            })
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(`${product.quantity} шт.`);
        $container.find('.product-price').text(`${product.quantity*product.price} $.`);
    }
    _addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                productImg:$(element).data('img'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        this._renderSum(this.amount, this.countGoods);
    }
    _remove(productId){
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            let $container = $(`div[data-product="${productId}"]`);
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $container.remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        this._renderSum(this.amount, this.countGoods);
    }
}