let userInfo = document.querySelector("#user-info");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logout");

let firstName = localStorage.getItem("usernameFirst");
let lastName = localStorage.getItem("usernameLast");

if (firstName && lastName) {
  links.remove();
  userInfo.style.display = "flex";
  user.innerHTML = firstName + " " + lastName;
}

logOutBtn.addEventListener("click", function () {
  localStorage.clear();

  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

let productsDom = document.querySelector(".products");
let cartsProductsDiv = document.querySelector(".carts-products div");
let cartsProductsMenu = document.querySelector(".carts-products");
let shoppingCart = document.querySelector(".shoppingCart");
let badge = document.querySelector(".badge");
let products = [
  {
    id: 1,
    title: "Laptop",
    category: "Electronics",
    price: "1050$", 
    imageUrl: "images/categorylist-img4.jpg",
    qty: 1,
  },
  {
    id: 2,
    title: "Coffee Maker",
    category: "Kitchen Appliances",
    price: "250$", 
    imageUrl: "images/categorylist-img9.jpg",
    qty: 1,
  },
  {
    id: 3,
    title: "Refrigerator",
    category: "Kitchen Appliances",
    price: "800$", 
    imageUrl: "images/categorylist-img7.jpg",
    qty: 1,
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    category: "Audio Devices",
    price: "45$", 
    imageUrl: "images/categorylist-img5.jpg",
    qty: 1,
  },
  {
    id: 5,
    title: "Security Camera",
    category: "Home Security",
    price: "120$", 
    imageUrl: "images/categorylist-img3.jpg",
    qty: 1,
  },
  {
    id: 6,
    title: "Mobiles Phone",
    category: "Mobile Devices",
    price: "300$", 
    imageUrl: "images/categorylist-img1.jpg",
    qty: 1,
  },
  {
    id: 7,
    title: "Smart Tablet",
    category: "Tablets",
    price: "200$", 
    imageUrl: "images/categorylist-img12.jpg",
    qty: 1,
  },
  {
    id: 8,
    title: "Photo Camera",
    category: "Photography",
    price: "500$", 
    imageUrl: "images/categorylist-img10.jpg",
    qty: 1,
  },
  {
    id: 9,
    title: "Smart Watches",
    category: "Wearables",
    price: "150$", 
    imageUrl: "images/categorylist-img8.jpg",
    qty: 1,
  },
  {
    id: 10,
    title: "Drone Camera",
    category: "Photography",
    price: "250$", 
    imageUrl: "images/categorylist-img6.jpg",
    qty: 1,
  },
  {
    id: 11,
    title: "Monitor",
    category: "Electronics",
    price: "6000$", 
    imageUrl: "images/categorylist-img11.jpg",
    qty: 1,
  },
  {
    id: 12,
    title: "Phone Accessories",
    category: "Mobile Accessories",
    price: "25$", 
    imageUrl: "images/categorylist-img2.jpg",
    qty: 1,
  },
];


function drawProductsUI() {
  let productsInCart = localStorage.getItem("productsInCart")
    ? JSON.parse(localStorage.getItem("productsInCart"))
    : [];
  
  
  let favoriteItems = localStorage.getItem("productsFavorite")
    ? JSON.parse(localStorage.getItem("productsFavorite"))
    : [];

  
  products.forEach(product => {
    product.liked = favoriteItems.some(fav => fav.id === product.id);
  });

  let productsUI = products.map((item) => {
    let isInCart = productsInCart.some((cartItem) => cartItem.id === item.id);
    return `
      <div class="product-item" id="product-${item.id}">
        <img src="${item.imageUrl}" alt="#" class="product-item-img">
        <div class="product-item-desc">
          <h2>Product: ${item.title}</h2>
          <p>Category: ${item.category}</p>
          <span>Price: ${item.price}</span>
        </div>
        <div class="product-item-actions">
          <button id="addToCartBtn-${item.id}" class="add-to-cart" onclick="addToCart(${item.id})" style="display: ${isInCart ? "none" : "inline-block"};">Add to cart</button>
          <button id="removeFromCartBtn-${item.id}" class="add-to-cart remove-from-cart" onclick="removeFromCart(${item.id})" style="display: ${isInCart ? "inline-block" : "none"};">Remove from cart</button>
          <i class="fa-solid fa-heart product-item-actions-icon" style="color: ${item.liked ? "red" : ""}" onclick="addToFavorite(${item.id})"></i>
        </div>
      </div>
    `;
  });

  productsDom.innerHTML = productsUI.join("");
}

drawProductsUI();

let addItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addItem.length > 0) {
  addItem.forEach((item) => {
    cartsProductsDiv.innerHTML += `
      <div class="itemsParent" id="cart-item-${item.id}">
        <p>${item.title}</p>
        <div>
          <i class="fa-solid fa-plus icon-plus" onclick="increaseQty(${item.id})"></i>
          <span>${item.qty}</span>
          <i class="fa-solid fa-minus icon-minus" onclick="decreaseQty(${item.id})"></i>
        </div>
      </div>`;
  });
  badge.innerHTML = addItem.length;
  badge.style.display = "block";
}

function addToCart(id) {
  let firstName = localStorage.getItem("usernameFirst");
  let lastName = localStorage.getItem("usernameLast");

  if (firstName && lastName) {
    let choosenItem = products.find((item) => item.id === id);
    let existingItem = addItem.find((item) => item.id === id);

    if (existingItem) {
      existingItem.qty++;
    } else {
      choosenItem.qty = 1;
      addItem.push(choosenItem);
    }

    localStorage.setItem("productsInCart", JSON.stringify(addItem));
    updateCartDisplay();

    document.getElementById(`addToCartBtn-${id}`).style.display = "none";
    document.getElementById(`removeFromCartBtn-${id}`).style.display =
      "inline-block";
  } else {
    window.location = "login.html";
  }
}

function removeFromCart(id) {
  addItem = addItem.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(addItem));
  updateCartDisplay();

  document.getElementById(`addToCartBtn-${id}`).style.display = "block";
  document.getElementById(`removeFromCartBtn-${id}`).style.display = "none";
}

function updateCartDisplay() {
  cartsProductsDiv.innerHTML = "";
  addItem.forEach((item) => {
    cartsProductsDiv.innerHTML += `
      <div class="itemsParent" id="cart-item-${item.id}">
        <p>${item.title}</p>
        <div>
          <i class="fa-solid fa-plus icon-plus" onclick="increaseQty(${item.id})"></i>
          <span>${item.qty}</span>
          <i class="fa-solid fa-minus icon-minus" onclick="decreaseQty(${item.id})"></i>
        </div>
      </div>`;
  });

  badge.innerHTML = addItem.length;
  badge.style.display = addItem.length > 0 ? "block" : "none";
}

function increaseQty(id) {
  let item = addItem.find((item) => item.id === id);
  if (item) {
    item.qty++;
    localStorage.setItem("productsInCart", JSON.stringify(addItem));
    updateCartDisplay();
  }
}

function decreaseQty(id) {
  let item = addItem.find((item) => item.id === id);
  if (item) {
    if (item.qty > 1) {
      item.qty--;
      localStorage.setItem("productsInCart", JSON.stringify(addItem));
      updateCartDisplay();
    } else {
      removeFromCart(id);
    }
  }
}

cartsProductsMenu.addEventListener("click", () => {
  cartsProductsMenu.style.display = "block";
});

let isCartMenuOpen = false;

function openCartMenu() {
  if (cartsProductsDiv.innerHTML !== "" && !isCartMenuOpen) {
    cartsProductsMenu.style.display = "block";
    isCartMenuOpen = true;
  }
}

shoppingCart.addEventListener("click", (event) => {
  event.stopPropagation();
  openCartMenu();
});

document.querySelector(".iconXmark").addEventListener("click", (event) => {
  event.stopPropagation();
  cartsProductsMenu.style.display = "none";
  isCartMenuOpen = false;
});

document.addEventListener("click", () => {
  if (isCartMenuOpen) {
    cartsProductsMenu.style.display = "none";
    isCartMenuOpen = false;
  }
});

function search() {
  let searchType = document.getElementById("searchType").value.toUpperCase();
  let searchInput = document.getElementById("searchInput").value.toUpperCase();
  let productItem = document.querySelectorAll(".product-item");
  let productItemTitle = document.querySelectorAll(".product-item h2");
  let productItemCategory = document.querySelectorAll(".product-item p");

  for (let i = 0; i < productItemTitle.length; i++) {
    let titleMatch =
      productItemTitle[i].innerHTML.toUpperCase().indexOf(searchInput) >= 0;
    let categoryMatch =
      productItemCategory[i].innerHTML.toUpperCase().indexOf(searchInput) >= 0;

    if (searchType === "NAME") {
      productItem[i].style.display = titleMatch ? "" : "none";
    } else if (searchType === "CATEGORY") {
      productItem[i].style.display = categoryMatch ? "" : "none";
    }
  }
}

function getUniqueArr(arr, key) {
  const uniqueItems = [];
  const ids = new Set();

  for (const item of arr) {
    if (!ids.has(item[key])) {
      ids.add(item[key]);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

let favoriteItems = localStorage.getItem("productsFavorite")
  ? JSON.parse(localStorage.getItem("productsFavorite"))
  : [];

function addToFavorite(id) {
  let firstName = localStorage.getItem("usernameFirst");
  let lastName = localStorage.getItem("usernameLast");

  if (firstName && lastName) {
    let choosenItem = products.find((item) => item.id === id);
    choosenItem.liked = true;
    if (choosenItem) {
      favoriteItems = [...favoriteItems, choosenItem];

      let uniqueProducts = getUniqueArr(favoriteItems, "id");

      localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
      updateCartDisplay();

      products.map((item) => {
        if (item.id === choosenItem.id) {
          item.liked = true;
        }
      });
      localStorage.setItem("products", JSON.stringify(products));
      drawProductsUI(products);
    }
  } else {
    window.location = "login.html";
  }
}
window.addEventListener('resize', function() {
  let screenWidth = window.innerWidth;
  console.log("تم تغيير عرض الشاشة: " + screenWidth + " بيكسل");
});
