//<><><><><><><><><><><<><><><<><><><><><>><><><><><><><><><><><><>//
//Product Page//
const products = document.getElementById('products');

class product {
  constructor(id, productName, productImage, imageDescription, price, category, headColor, color) {
    this.id = id;
    this.productName = productName;
    this.productImage = productImage;
    this.imageDescription = imageDescription;
    this.price = price;
    this.category = category;
    this.headColor = headColor;
    this.color = color;
  }
}

let productsArr = [];

const product3 = new product(03, 'Liquid Chlorine', '../pics/Liquid_Pool_Chlorine.jpg', 'Liquid Chlorine', '$14.99', 'Chemicals', '#1a3be0', '#1a9ee0');
const product4 = new product(04, 'PH Minus', '../pics/Liquid_Pool_Chlorine.jpg', 'PH Minus', '$4.89', 'Chemicals', '#1a3be0', '#1a9ee0');
const product8 = new product(08, 'algeacide 60', '../pics/Liquid_Pool_Chlorine.jpg', 'Algeacide', '$60.99', 'Chemicals', '#1a3be0', '#1a9ee0');
const product9 = new product(09, 'Pump 1.0 HP In-Ground Pump', '../pics/pool1.jpeg', 'Pump', '$649.99', 'Pump', '#1a3be0', '#1a9ee0');
const product10 = new product(10, 'Pump 1.5 HP In-Ground Pump', '../pics/pool1.jpeg', 'Pump', '$899.99', 'Pump', '#1a3be0', '#1a9ee0');
const product11 = new product(11, 'Pump 1.0 HP Above Ground Pump', '../pics/pool1.jpeg', 'Pump', '$249.99', 'Pump', '#1a3be0', '#1a9ee0');
const product13 = new product(13, 'Sand Filter', '../pics/pool1.jpeg', 'Filter', '$369.99', 'Filter', '#1a3be0', '#1a9ee0');
const product14 = new product(14, 'D.E. Filter', '../pics/pool1.jpeg', 'Filter', '$379.99', 'Filter', '#1a3be0', '#1a9ee0');
const product15 = new product(15, 'Cartridge Filter', '../pics/pool1.jpeg', 'Filter', '$439.99', 'Filter', '#1a3be0', '#1a9ee0');
const product17 = new product(17, '24ft Above Ground Pool', '../pics/pool2.jpeg', 'Pool', '$2439.99', 'Pool', '#1a3be0', '#1a9ee0');
const product18 = new product(18, '33ft Above Ground Pool', '../pics/pool3.jpeg', 'Pool', '$3439.99', 'Pool', '#1a3be0', '#1a9ee0');
const product19 = new product(19, '18 x 36 In-Ground Pool', '../pics/pool4.jpeg', 'Pool', '$60000', 'Pool', '#1a3be0', '#1a9ee0');
const product21 = new product(21, '5 Person Spa', '../pics/pool6.jpg', 'Spa', '$8299.99', 'Spa', '#1a3be0', '#1a9ee0');
const product22 = new product(22, '10 Person Spa', '../pics/pool8.jpeg', 'Spa', '$13349.99', 'Spa', '#1a3be0', '#1a9ee0');

productsArr.push(product3, product4, product8, product9, product10, product11, product13, product14, product15, product17, product18, product19, product21, product22);

// Displaying product cards to the page
function pool() {
  let btn_num = 0;

  productsArr.forEach(poolProduct => {
    products.insertAdjacentHTML('beforeend',
      `<div class="custom card text-white mb-3 mx-3" >
          <div class="card-header text-center" style="background-color: ${poolProduct.headColor}">${poolProduct.productName}</div>
          <div class="card-body" style="background-color: ${poolProduct.color}">
            <img class="card-img mb-3" src="${poolProduct.productImage}" alt="${poolProduct.imageDescription}">
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary purchaseBtn" btn_num=${btn_num}>Buy</button>
              <p class="card-text text-dark">${poolProduct.price}</p>
              </div>
            </div>
          </div>
        </div>`
    );

    products.querySelector(`button[btn_num='${btn_num++}']`).addEventListener('click', function () {
      addToCart(`${poolProduct.productName}`);
    });
  });
}

// Get cart from localStorage or start fresh
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add or update item in cart
function addToCart(name) {
  const product = productsArr.find(p => p.productName === name);
  const existingItem = cart.find(item => item.productName === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Update item in cart
function deleteFromCart(name) {
  const product = productsArr.find(p => p.productName === name);
  const existingItem = cart.find(item => item.productName === name);

  if (existingItem) {
    if (existingItem.quantity <= 0) {
      return;
    }
    existingItem.quantity--;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Remove item from cart
function removeFromCart(productName) {
  cart = cart.filter(item => item.productName !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear the cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}

// Render cart to DOM
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.querySelector(".cartTotal");
  const cartTotal2 = document.querySelector(".cartTotal2");

  let btn_num = 0;
  let btn_sub = 0

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-group-item";
    // Shopping Cart
    div.insertAdjacentHTML('afterbegin', `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div class="fw-bold">${item.productName}</div>
          <small class="text-muted">Quantity: ${+(item.quantity)}</small>
        </div>
        
        <div class="text-end">
          <div class="fw-bold text-center text-primary">$${(parseFloat(item.price.substring(1)) * +(item.quantity)).toFixed(2)}</div>
          <button class="btn btn-outline-primary btn-sm minus" btn_sub=${btn_sub}>
            <i class="fa fa-fw" aria-hidden="true" title="Copy to use minus"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger m-1" onclick="removeFromCart('${item.productName}')">
            <i class="fa fa-fw" aria-hidden="true" title="Copy to use trash-alt"></i>
          </button>
          <button class="btn plus btn-outline-primary" btn_num=${btn_num}>
            <i class="fa fa-fw" aria-hidden="true" title="Copy to use plus"></i>
          </button>
        </div>
      </div>
    `);

    cartItems.appendChild(div);
    total += parseFloat(item.price.substring(1)) * parseInt(item.quantity) * 1.07;
    // Add button
    div.querySelector(`button[btn_num='${btn_num++}']`).addEventListener('click', function () {
      addToCart(`${item.productName}`);
    });
    // Subtract button
    div.querySelector(`button[btn_sub='${btn_sub--}']`).addEventListener('click', function () {
      deleteFromCart(`${item.productName}`);
    });
  });

  cartTotal.textContent = total.toFixed(2);
  cartTotal2.textContent = total.toFixed(2);
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  pool();

  // Add Clear Cart button
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear Cart";
  clearBtn.className = "btn btn-warning";
  clearBtn.onclick = clearCart;
  document.querySelector(".cartSection .card").appendChild(clearBtn);
  total = 0;
});