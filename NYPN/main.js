// Collection Filter
let colBtns = document.querySelectorAll(".btn-col");
let colItems = document.querySelectorAll(".collection-item");

colBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      colBtns.forEach((colBtn) => colBtn.classList.remove("btn"));
      e.currentTarget.classList.add("btn");

      let dataBtn = btn.getAttribute("data-btn");
      colItems.forEach((col) => {
         col.classList.toggle("hide", col.getAttribute("data-item") !== dataBtn && dataBtn !== "all");
      });
   });
});

// Nav Bar Toggle
let ul = document.querySelector("ul");
let burgerIcon = document.querySelector(".burger_icon");

burgerIcon.addEventListener("click", () => {
   burgerIcon.classList.toggle("fa-xmark");
   burgerIcon.classList.toggle("fa-bars");
   ul.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
   updateCartCount();
   loadCartItems();

   document.querySelectorAll(".add-to-cart-btn").forEach(button => {
       button.addEventListener("click", function () {
           let productCard = this.closest(".collection-item");
           let productName = productCard.querySelector(".heading-three").textContent;
           let productPrice = parseFloat(productCard.querySelector(".show-price").textContent.replace("₱", ""));
           let productImg = productCard.querySelector("img").src;
           let selectedFlavor = productCard.querySelector(".flavor-select").value;

           let product = { name: productName, price: productPrice, img: productImg, flavor: selectedFlavor, quantity: 1 };
           addToCart(product);
           alert(`${productName} (${selectedFlavor}) has been added to your cart!`);
       });
   });

   document.getElementById("clear-cart").addEventListener("click", function () {
       localStorage.removeItem("cart");
       updateCartCount();
       loadCartItems();
   });

   document.getElementById("checkout").addEventListener("click", function () {
       let cart = JSON.parse(localStorage.getItem("cart")) || [];
       if (cart.length === 0) {
           alert("Your cart is empty! Add items before proceeding.");
           return;
       }
       let total = calculateTotal(cart);
       alert(`Thank you for your purchase! 🎉\nTotal: ₱${total.toFixed(2)}`);
       localStorage.removeItem("cart");
       updateCartCount();
       loadCartItems();
   });
});

function addToCart(item) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   let existingItem = cart.find(cartItem => cartItem.name === item.name && cartItem.flavor === item.flavor);
   if (existingItem) {
       existingItem.quantity += 1;
   } else {
       cart.push(item);
   }
   localStorage.setItem("cart", JSON.stringify(cart));
   updateCartCount();
}

function updateCartCount() {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
   document.querySelector(".cart-count").textContent = totalQuantity;
}

function loadCartItems() {
   let cartContainer = document.getElementById("cart-items");
   let totalPriceEl = document.getElementById("cart-total");
   if (!cartContainer) return;

   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   cartContainer.innerHTML = cart.length === 0 ? "<p>Your cart is empty.</p>" : "";

   let totalPrice = calculateTotal(cart);
   cart.forEach((item, index) => {
       let cartItem = document.createElement("div");
       cartItem.classList.add("cart-item");
       cartItem.innerHTML = `
           <img src="${item.img}" alt="${item.name}" width="50">
           <p><strong>${item.name}</strong> (${item.flavor}) - ₱${item.price.toFixed(2)}</p>
           <div class="cart-quantity">
               <button class="decrease-qty" data-index="${index}">-</button>
               <span>${item.quantity}</span>
               <button class="increase-qty" data-index="${index}">+</button>
           </div>
           <button class="remove-item" data-index="${index}">Remove</button>
       `;
       cartContainer.appendChild(cartItem);
   });
   totalPriceEl.textContent = `₱${totalPrice.toFixed(2)}`;

   document.querySelectorAll(".increase-qty").forEach(button => {
       button.addEventListener("click", function () {
           let index = this.getAttribute("data-index");
           cart[index].quantity += 1;
           localStorage.setItem("cart", JSON.stringify(cart));
           loadCartItems();
       });
   });

   document.querySelectorAll(".decrease-qty").forEach(button => {
       button.addEventListener("click", function () {
           let index = this.getAttribute("data-index");
           if (cart[index].quantity > 1) {
               cart[index].quantity -= 1;
           } else {
               cart.splice(index, 1);
           }
           localStorage.setItem("cart", JSON.stringify(cart));
           updateCartCount();
           loadCartItems();
       });
   });

   document.querySelectorAll(".remove-item").forEach(button => {
       button.addEventListener("click", function () {
           let index = this.getAttribute("data-index");
           cart.splice(index, 1);
           localStorage.setItem("cart", JSON.stringify(cart));
           updateCartCount();
           loadCartItems();
       });
   });
}

function calculateTotal(cart) {
   return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
