
// =====================================
// ELITESHOP MAIN JAVASCRIPT
// =====================================

// 1. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 2. GET PRODUCTS FROM LOCAL STORAGE

function getProductsCart() {
    return JSON.parse(
        localStorage.getItem("eliteProducts")
    ) || [];
}


// 3. UPDATE CART COUNTER

function updateCart() {

    const products = getProductsCart();

    let totalItems = 0;

    products.forEach(function(product) {
        totalItems += Number(product.quantity) || 0;
    });

    const cartElement =
        document.getElementById("cartCount");

    if (cartElement) {
        cartElement.textContent = totalItems;
    }
}

updateCart();


// 4. ADD PRODUCTS TO CART

const cartButtons = document.querySelectorAll(
    ".product-card button"
);

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard =
            button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        const priceText =
            productCard.querySelector("h4").textContent;

        const productPrice = Number(
            priceText.replace(/[^\d]/g, "")
        );

        let products = getProductsCart();

        // CHECK IF PRODUCT ALREADY EXISTS

        const existingProduct = products.find(
            function(product) {
                return product.name === productName;
            }
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            products.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        // SAVE PRODUCTS

        localStorage.setItem(
            "eliteProducts",
            JSON.stringify(products)
        );

        updateCart();

        button.textContent = "Added ✓";

        setTimeout(function() {
            button.textContent = "Add to Cart";
        }, 1200);

    });

});


// 5. SEARCH PRODUCTS

const searchInput =
    document.getElementById("productSearch");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText =
            searchInput.value.toLowerCase();

        const products =
            document.querySelectorAll(".product-card");

        products.forEach(function(product) {

            const productText =
                product.textContent.toLowerCase();

            product.style.display =
                productText.includes(searchText)
                ? ""
                : "none";

        });

    });

}

// =====================================
// END ELITESHOP MAIN JAVASCRIPT
// =====================================
