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



// showCart(true);