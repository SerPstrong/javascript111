const Catalog = {
    goods: [
        {
            id_product: 123,
            product_name: 'Ноутбук',
            price: 45600,
            quantity: 1,
        },
        {
            id_product: 456,
            product_name: 'Мышка',
            price: 1000,
            quantity: 2,
        },
        {
            id_product: 305,
            product_name: 'Клавиатура',
            price: 2000,
            quantity: 1,
        },
    ],
};


for (key in Catalog.goods) {
    document.querySelector('.new_catalog').innerHTML += `<p>${Catalog.goods[key].product_name}</p><p>${Catalog.goods[key].price}</p>
<button id='${Catalog.goods[key].id_product}' class='btnSendToCard'>Добавить</button>`;
}


let btnSendToCard = document.getElementsByClassName('btnSendToCard');
// btnSendToCard - это HTML коллекция

// это метод который будет добавлять товар в козину
let sendToCart = (e) => {
// Получаем  id кнопки
    console.log('Добавляем что-то в корзину', e.target.id);
// Перебераем весь кталог на поиск нашего товара

    for (key in Catalog.goods) {
        if (Catalog.goods[key].id_product == e.target.id) {
            console.log('Нашли');
// если товар нашли то Пушим в массив корзины
            cart.goods.push(Catalog.goods[key]);
        }
    }
    console.log('Корзина', cart.goods);
    cart.render();
};

// ... - это спред оператор  появился в ES6
//преобразует коллекцию  обычный масси
// далемм можно было было использовать for (let i = 0; i<[...btnSendToCard].lenght; i++)
// Но есть волшебный map который переберает массив и в element (можно назвать как угодно) попадает один элемент массива

[...btnSendToCard].map(element => {
    element.addEventListener('click', sendToCart);
});

const cart = {
    cartListBlock: null,
    cartButton: null,
    goods: [],

    render() {
        this.cartListBlock = document.querySelector('.cart-list');
        this.cartButton = document.querySelector('.cart-btn');

        if (this.goods.length > 0) {
            this.cartListBlock.textContent = `В корзине ${this.goods.length} товаров(а) стоимостью ${this.getCartPrice()}`;
        } else {
            this.cartListBlock.textContent = 'Корзина пуста';
        }

        this.cartButton.addEventListener('click', this.dropCart.bind(this));
    },
    getCartPrice() {
        return this.goods.reduce((price, good) => {
            return price + good.price * good.quantity;
        }, 0);
    },
    dropCart() {
        this.goods = [];
        this.render();
    },
    cartItem(name, price) {
        return `<div>
                <div class="cart-title">${name}</div>
                <div class="cart-price">${price}</div>
            </div>`;
    },
};

cart.render();