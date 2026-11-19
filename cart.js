
/* =================================
   ELITESHOP SHOPPING CART
================================= */

// 1. GET CART DATA

let productsCart = JSON.parse(
    localStorage.getItem("eliteProducts")
) || [];


// 2. DISPLAY CART PRODUCTS

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (productsCart.length === 0) {

        cartItems.innerHTML = "<p>Your shopping cart is empty.</p>";

        cartTotal.textContent = "Total: MWK 0";

        return;
    }

    productsCart.forEach(function(product, index) {

        const subtotal = product.price * product.quantity;

        total += subtotal;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: MWK ${product.price.toLocaleString()}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Subtotal: MWK ${subtotal.toLocaleString()}</p>

            <button onclick="removeProduct(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(item);

    });

    cartTotal.textContent =
        "Total: MWK " + total.toLocaleString();

}


// 3. REMOVE PRODUCT

function removeProduct(index) {

    productsCart.splice(index, 1);

    saveCart();

}


// 4. CLEAR CART

function clearCart() {

    productsCart = [];

    saveCart();

}


// 5. SAVE CART

function saveCart() {

    localStorage.setItem(
        "eliteProducts",
        JSON.stringify(productsCart)
    );

    displayCart();

}


// 6. CLEAR CART BUTTON

const clearButton = document.getElementById("clearCart");

if (clearButton) {

    clearButton.addEventListener("click", clearCart);

}


// 7. START SHOPPING CART

displayCart();


/* END ELITESHOP CART SYSTEM */

