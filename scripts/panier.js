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



// showCart(true);