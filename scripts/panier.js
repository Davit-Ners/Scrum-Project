// Javascript pour la partie 'Gestion de project'

// Recuperation elements DOM
const PanierDiv = document.getElementById('cart-pack-elem');
const cartTitle = document.getElementById('cart-title');

// Const et Let "test" pour ma partie
// let cartIsEmpty = true;
const cartElem = []

// Fonctions

function showCart(cartIsEmpty, cartElements) {
    if (cartIsEmpty) {
        cartTitle.textContent = 'Your Cart (0)';
    }

    else {
        showCartElem(cartElements);
    }
}

function createCartProduct(elem) {
    // Creation d'une div pour y mettre les infos du produit
    const productBlock = document.createElement('div');

    // Creation et attribution des infos sur l'element

    const productTitle = document.createElement('h3');
    productTitle.textContent = elem.title;

    const productDetails = document.createElement('div');
    
    const productPrice = document.createElement('p');
    productPrice.textContent = `$${elem.price}`;

    const productCount = document.createElement('p');
    productCount.textContent = `${elem.count}x`;

    const productTotalPrice = document.createElement('p');
    productTotalPrice.textContent = `$${elem.count * elem.price}`;

    // Ajout des elements au block principal
    productDetails.append(productCount, productPrice, productTotalPrice);
    productBlock.append(productTitle, productDetails);

    // Ajout de l'element au DOM
    PanierDiv.append(productBlock);

    return elem.count * elem.price;
}

function createTotalPriceDiv(totalPrice) {
    const totalPriceBlock = document.createElement('div');
    const totalTitle = document.createElement('p');
    totalTitle.textContent = 'Total Price';

    const showTotalPrice = document.createElement('p');
    showTotalPrice.textContent = `$${totalPrice}`;

    totalPriceBlock.append(totalTitle, showTotalPrice);

    PanierDiv.append(totalPriceBlock);
}

function showCartElem(cartElements) {
    let totalPrice = 0;
    for (let elem of cartElements) {
        const price = createCartProduct(elem);
        totalPrice += price;
    }
    
    createTotalPriceDiv(totalPrice);
}

// showCart(true);