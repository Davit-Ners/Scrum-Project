// Javascript pour la partie 'Gestion de project'

// Recuperation elements DOM
const PanierDiv = document.getElementById('cart-pack-elem');
const cartTitle = document.getElementById('cart-title');

// Const et Let "test" pour ma partie
// let cartIsEmpty = true;
let cartElem = [];
let countId = 0;

// Fonctions

function showCart(cartIsEmpty, cartElements) {
    PanierDiv.innerHTML = '';
    if (cartIsEmpty) {
        cartTitle.textContent = 'Your Cart (0)';
    }

    else {
        showCartElem(cartElements);
        cartTitle.textContent = `Your Cart (${cartElements.length})`;
    }
}

function deleteProduct(id, elemTotalPrice, elem) {
    const blockToDelete = document.getElementById(`cartProduct${id}`);
    let totalPrice = Number((document.getElementById('totalPriceId').textContent).slice(1));
    console.log(document.getElementById('totalPriceId'));
    totalPrice -= elemTotalPrice;
    document.getElementById('totalPriceId').textContent = `$${totalPrice}`;
    blockToDelete.remove();
    const objectToDelete = elem;
    console.log(elem);
    cartElem = cartElem.filter(item => JSON.stringify(item) !== JSON.stringify(objectToDelete));

    if (totalPrice == 0) {
        cartElem.length = 0;
        showCart(false, cartElem);
    }
}

function createDeleteBtn(id, elemTotalPrice, elem) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginRight = '10px';
    deleteBtn.id = `delete${id}`;

    deleteBtn.addEventListener('click', () => deleteProduct(id, elemTotalPrice, elem));

    return deleteBtn;
}

function createCartProduct(elem, id) {
    // Creation d'une div pour y mettre les infos du produit
    const productBlock = document.createElement('div');
    productBlock.id = `cartProduct${id}`;

    // Creation et attribution des infos sur l'element

    const productTitle = document.createElement('h3');
    productTitle.textContent = elem.name;

    const productDetails = document.createElement('div');
    
    const productPrice = document.createElement('p');
    productPrice.textContent = `$${elem.price}`;

    const productCount = document.createElement('p');
    productCount.textContent = `${elem.count}x`;

    const productTotalPrice = document.createElement('p');
    productTotalPrice.textContent = `$${elem.count * elem.price}`;

    const deleteBtn = createDeleteBtn(id, elem.count * elem.price, elem);

    // Ajout des elements au block principal
    productDetails.append(productCount, productPrice, productTotalPrice, deleteBtn);
    productDetails.className = 'productDetails';
    productBlock.append(productTitle, productDetails);

    // Ajout de l'element au DOM
    PanierDiv.append(productBlock);

    return elem.count * elem.price;
}

function createTotalPriceDiv(totalPrice) {
    const totalPriceBlock = document.createElement('div');
    const totalTitle = document.createElement('p');
    totalTitle.textContent = 'Order Total';

    const showTotalPrice = document.createElement('p');
    showTotalPrice.id = 'totalPriceId';
    showTotalPrice.textContent = `$${totalPrice}`;

    totalPriceBlock.append(totalTitle, showTotalPrice);
    totalPriceBlock.className = 'orderTotal';

    PanierDiv.append(totalPriceBlock);
}

function showCartElem(cartElements) {
    let totalPrice = 0;
    for (let elem of cartElements) {
        const price = createCartProduct(elem, countId);
        totalPrice += price;
        countId++;
    }
    
    createTotalPriceDiv(totalPrice);
}

// showCart(!(cartElem.length > 0), cartElem);











const productsContainer = document.getElementById('products-container');
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    });

function displayProducts(products) {

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
        <img src="${product.image.desktop}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Prix : ${product.price}€</p>
        <button class="add-to-cart" 
          data-name="${product.name}" 
          data-image="${product.image.desktop}" 
          data-price="${product.price}">
          Ajouter au panier
        </button>`;
        productsContainer.appendChild(productElement);
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {

                if (button.classList.contains('active')) {
                    return;
                }
                const product = {
                    name: button.getAttribute('data-name'),
                    price: parseFloat(button.getAttribute('data-price')),
                    image: button.getAttribute('data-image'),
                    count: 1
                  };
                cartElem.push(product);
                console.log(cartElem);
                showCart(!(cartElem.length > 0), cartElem);
                button.classList.add('active');
                button.innerHTML = `
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <input type="number" class="quantity" value="1">
                    <button class="increase">+</button>
                </div>`
                const quantityInput = button.querySelector('.quantity');
                const decreaseButton = button.querySelector('.decrease');
                const increaseButton = button.querySelector('.increase');

                decreaseButton.addEventListener('click', () => {
                  
                    let currentQuantity = parseInt(quantityInput.value);
                    if (currentQuantity > 1) {
                        quantityInput.value = currentQuantity - 1;

                        cartElem = cartElem.filter(item => JSON.stringify(item) !== JSON.stringify(product));

                        product.count -= 1;

                        cartElem.push(product);
                        console.log(cartElem);
                        showCart(!(cartElem.length > 0), cartElem);

                        console.log("le produit"+ product + "a ete cliqué" +quantityInput.value )
                    }
                });

                // Incrémenter la quantité
                increaseButton.addEventListener('click', () => {
                    let currentQuantity = parseInt(quantityInput.value);
                    quantityInput.value = currentQuantity + 1;

                    cartElem = cartElem.filter(item => JSON.stringify(item) !== JSON.stringify(product));

                    product.count += 1;

                    cartElem.push(product);
                    console.log(cartElem);
                    showCart(!(cartElem.length > 0), cartElem);

                    console.log("le produit"+ product + "a ete cliqué" +quantityInput.value )
                });


            })
        });

    });


}









const confirmOrderButton = document.querySelector('.confirm-order-button');
confirmOrderButton.addEventListener('click',
    () => openConfirmationModal([{ name: "banane", price: 34, amount: 5, total: 120, cartTotal: 120 }], 400))

function openConfirmationModal(cartItems, cartTotalPrice) {
    document.querySelector('.confirmation-modal').style.display = 'flex';

    cartItems.forEach(item => {
        createModalListCard(item);
    });

    const modalItemList = document.querySelector('.item-list-div');

    const cartTotalDiv = document.createElement('div');
    cartTotalDiv.classList.add('cart-total-div');

    const cartTotal = document.createElement('p');
    cartTotal.textContent = cartTotalPrice;

    modalItemList.append(cartTotalDiv, cartTotal)
}

function createModalListCard(item) {
    const modalItemList = document.querySelector('.item-list-div');
    modalItemList.innerHTML = "";

    const productCard = document.createElement('div');
    productCard.classList.add('modal-product-card');

    const productCardImg = document.createElement('img');
    productCard.append(productCardImg);

    const productCardContent = document.createElement('p');
    const productCardName = document.createElement('p');
    productCardName.textContent = item.name;
    const productCardAmount = document.createElement('p');
    productCardAmount.textContent = item.amount;
    const productCardPrice = document.createElement('p');
    productCardPrice.textContent = item.price;
    const productCardTotal = document.createElement('p');
    productCardTotal.textContent = item.total;

    productCardContent.append(productCardName, productCardAmount, productCardPrice, productCardTotal);
    productCard.append(productCardImg, productCardContent);

    modalItemList.append(productCard);
}

const closeButton = document.querySelector('.start-new-order-button');
closeButton.addEventListener('click', closeConfirmationModal);

function closeConfirmationModal(e) {
    if (e) e.preventDefault();
    document.querySelector('.confirmation-modal').style.display = 'none';
}