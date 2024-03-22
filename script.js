// script.js

// document.addEventListener("DOMContentLoaded", function () {
//     // Example of adding featured products dynamically
//     const products = [
//         { name: "Product 1", price: "$19.99", image: "download.jpg" },
//         { name: "Product 2", price: "$24.99", image: "download2.jpg" },
//         { name: "Product 3", price: "$29.99", image: "download2.jpg" }
//     ];

//     const productContainer = document.querySelector(".product-list");

//     products.forEach(product => {
//         const productCard = document.createElement("div");
//         productCard.classList.add("product-card");
//         productCard.innerHTML = `
//             <img src="images/${product.image}" alt="${product.name}">
//             <h3>${product.name}</h3>
//             <p>${product.price}</p>
//             <button class="add-to-cart-btn">Add to Cart</button>
//         `;
//         productContainer.appendChild(productCard);
//     });
// });

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//       .then(function(registration) {
//         console.log('Service worker registration successful:', registration.scope);
//       })
//       .catch(function(error) {
//         console.log('Service worker registration failed:', error);
//       });
//   }

// document.querySelector(".add-to-cart-btn").addEventListener("click",async() => {
//   var swRegistration = await navigator.serviceWorker.register("sw.js");
//   swRegistration.sync.register("helloSync").then(function () {
//     console.log("helloSync success [script.js]");
//   });
// });

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/sw.js')
  //     .then(function(registration) {
  //       console.log('Service worker registration successful:', registration.scope);
  //     })
  //     .catch(function(error) {
  //       console.log('Service worker registration failed:', error);
  //     });
  // }
  
  document.addEventListener("DOMContentLoaded", function () {
    // Example of adding featured products dynamically
    const products = [
        { name: "Product 1", price: "$19.99", image: "download.jpg" },
        { name: "Product 2", price: "$24.99", image: "download2.jpg" },
        { name: "Product 3", price: "$29.99", image: "download2.jpg" }
    ];

    const productContainer = document.querySelector(".product-list");

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        // Add click event listener to each button *inside* the loop
        const addToCartButton = productCard.querySelector(".add-to-cart-btn");
        addToCartButton.addEventListener("click", async () => {
            var swRegistration = await navigator.serviceWorker.register("sw.js");
            swRegistration.sync.register("helloSync").then(function () {
                console.log("helloSync success [script.js]");
            });
        });

        productContainer.appendChild(productCard);
    });

    // if ('serviceWorker' in navigator) {
    //     // ... service worker registration code (commented out) ...
    // }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service worker registration successful:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service worker registration failed:', error);
        });
}
