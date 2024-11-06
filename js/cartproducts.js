let userInfo = document.querySelector("#user-info");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logout");
let totalPrice = document.querySelector(".totalPrice"); 

let firstName = localStorage.getItem("usernameFirst");
let lastName = localStorage.getItem("usernameLast");

if (firstName && lastName) {
  links.remove();
  userInfo.style.display = "flex";
  user.innerHTML = firstName + lastName;
}

logOutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

let productsInCart = localStorage.getItem("productsInCart");
let productsDom = document.querySelector(".products");

if (productsInCart) {
  let items = JSON.parse(productsInCart);
  drawCartProductsUI(items);
}

function drawCartProductsUI(products) {
  let total = 0;
  let productsUI = products.map((item, index) => {
   
    let price = parseFloat(item.price) || 0; 
    let qty = parseInt(item.qty) || 0;

    total += price * qty;
    return `
      <div class="product-item">
          <img src="${item.imageUrl}" alt="#" class="product-item-img">
          <div class="product-item-desc">
              <h2>Product: ${item.title}</h2>
              <p>Category: ${item.category}</p>
              <span>Price: ${price}</span>
          </div>
          <div class="product-item-actions">
              <button class="add-to-cart remove-from-cart" onclick="removeItemFromCart(${index})">Remove From Cart</button>
              <div style="align-items: center;width: 90px;">
                  <i class="fa-solid fa-plus icon-plus=" style="font-size: 25px ;color: #2762d1;cursor: pointer;" onclick="increaseQty(${item.id})"></i>
                  <span style="font-size: 20px;display: inline-block; margin: 0 6px;">${qty}</span>
                  <i class="fa-solid fa-minus icon-minus" style="font-size: 25px ;color: #b32f25;cursor: pointer;" onclick="decreaseQty(${item.id})"></i>
              </div>
          </div>
      </div>
    `;
  });

  productsDom.innerHTML = productsUI.join("");

  if (total === 0) {
    totalPrice.style.display = "none"; 
  } else {
    totalPrice.style.display = "block";
    totalPrice.innerHTML = `Total Price: $${total.toFixed(2)}`;
  }
  
  totalPrice.innerHTML = `Total Price: $${total.toFixed(2)}`;
}

function removeItemFromCart(index) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    items.splice(index, 1);
    localStorage.setItem("productsInCart", JSON.stringify(items));
    drawCartProductsUI(items);
  }
}

function increaseQty(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let item = items.find((item) => item.id === id);
    if (item) {
      item.qty += 1; 
      localStorage.setItem("productsInCart", JSON.stringify(items));
      drawCartProductsUI(items);
    }
  }
}

function decreaseQty(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let items = JSON.parse(productsInCart);
    let item = items.find((item) => item.id === id);
    if (item) {
      if (item.qty > 1) { 
        item.qty -= 1;
        localStorage.setItem("productsInCart", JSON.stringify(items));
        drawCartProductsUI(items); 
      } else {
        removeItemFromCart(items.indexOf(item));
      }
    }
  }
}










let Favorites = document.querySelector(".Favorites")




function drawFavoritesProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0)
    Favorites.innerHTML = "There is no items !!";

  let products =
    JSON.parse(localStorage.getItem("productsFavorite")) || allProducts;
  let productsUI = products.map((item) => {
    return `
        <div class="product-item">
          <img
            src="${item.imageUrl}"
            class="product-item-img"
            alt="image"
          />
  
          <div class="product-item-desc">
            <h2>${item.title}</h2>
            <p>${item.category}</p>
            <span> price: ${item.price} </span> <br>
          </div>
  
          <div class="product-item-actions">
            <button class="fa-solid fa-trash-can trash-can" onclick="removeItemFromFavorite(${item.id})"></button>
          </div>
        </div>
      `;
  });

  Favorites.innerHTML = productsUI.join("");
}

drawFavoritesProductsUI();

function removeItemFromFavorite(id) {
  let productsFavorite = localStorage.getItem("productsFavorite");
  if (productsFavorite) {
    let items = JSON.parse(productsFavorite);
    let filteredItems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
    drawFavoritesProductsUI(filteredItems);
  }
}
