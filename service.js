// service.js
document.addEventListener("DOMContentLoaded", () => {
  const serviceDropdown = document.getElementById("serviceDropdown");
  const imageDropdown = document.getElementById("imageDropdown");
  const imageDisplay = document.getElementById("imageDisplay");
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");

  let cart = [];

  // 🔹 Sample image data (replace with your actual image paths)
  const data = {
    rental: [
      { src: "../assets/images/rental/rental-luxury-apartment.avif", desc: "Luxury Apartment for Rent" },
      { src: "../assets/images/rental/rental-city-center.avif", desc: "City Center Condo - Affordable" },
      { src: "../assets/images/rental/rental-suburban.avif", desc: "Peaceful Suburban Rental" }
    ],
    buySell: [
      { src: "../assets/images/buy&sell/buy&sell-modern-house.avif", desc: "Modern House for Sale" },
      { src: "../assets/images/buy&sell/buy&sell-family-house.avif", desc: "Family Home - Great Deal" },
      { src: "../assets/images/buy&sell/buy&sell-luxury-villa.avif", desc: "Luxury Villa for Sale" }
    ],
    advisory: [
      { src: "../assets/images/estate-tax-advisory/expert-estate-advisory.avif", desc: "Expert Estate Advisory Services" },
      { src: "../assets/images/estate-tax-advisory/estate-tax-advisory-investment&market.avif", desc: "Investment & Market Consultation" },
      { src: "../assets/images/estate-tax-advisory/investment-consult-house.avif", desc: "Consultation & Investment"}
      ],
    valuation: [
      { src: "../assets/images/property-valuation/prop-valuation-house-props", desc: "Residential Property Valuation" },
      { src: "../assets/images/property-valuation/", desc: "Commercial Valuation Analysis" },
      { src: "../assets/images/property-valuation/property-valuation-property-view.avif", desc: "Property Viewing"}
    ],
    recent: [
      { src: "../assets/images/recent/recent-1.avif"},
      { src: "../assets/images/recent/recent-2.avif"},
      { src: "../assets/images/recent/recent-3.avif"},
      { src: "../assets/images/recent/recent-4.avif"},
      {src: "../assets/images/recent/recent-5.avif"},
      { src: "../assets/images/recent/recent-6.avif"}
    ],
    newArrival: [
      { src: "../assets/images/new-arrivals/new-arrivals-1.avif"},
      { src: "../assets/images/new-arrivals/new-arrivals-2.avif"},
      { src: "../assets/images/new-arrivals/new-arrivals-3.avif"},
      { src: "../assets/images/new-arrivals/new-arrivals-4.avif"},
      { src: "../assets/images/new-arrivals/new-arrivals-5.avif"},
      { src: "../assets/images/new-arrivals/new-arrivals-6.avif"}
    ]
  };

  // 🔹 Render Images Function
  function renderImages(images) {
    imageDisplay.innerHTML = "";

    if (!images || images.length === 0) {
      imageDisplay.innerHTML = "<p>No images available for this selection.</p>";
      return;
    }

    images.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("image-card");
      card.innerHTML = `
        <img src="${item.src}" alt="Property image">
        <div class="description">${item.desc}</div>
        <button class="add-btn">Add to Cart</button>
      `;
      imageDisplay.appendChild(card);

      // Enlarge image on click
      card.querySelector("img").addEventListener("click", () => showModal(item.src));

      // Add to cart button
      card.querySelector(".add-btn").addEventListener("click", () => addToCart(item));
    });
  }

  // 🔹 Dropdown Change Events
  serviceDropdown.addEventListener("change", () => {
    const value = serviceDropdown.value;
    if (data[value]) renderImages(data[value]);
  });

  imageDropdown.addEventListener("change", () => {
    const value = imageDropdown.value;
    if (data[value]) renderImages(data[value]);
  });

  // 🔹 Modal for Enlarged Image
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<img src="" alt="Enlarged image">`;
  document.body.appendChild(modal);

  modal.addEventListener("click", () => modal.classList.remove("show"));

  function showModal(src) {
    modal.querySelector("img").src = src;
    modal.classList.add("show");
  }

  // 🔹 Add to Cart Function
  function addToCart(item) {
    const exists = cart.find(c => c.src === item.src);
    if (!exists) {
      cart.push(item);
      updateCartCount();
      showAddedNotification(item.desc);
    }
  }

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }


// 🔹 Cart Slide View (with Exit Button)
const cartView = document.createElement("div");
cartView.className = "cart-view";
document.body.appendChild(cartView);

cartIcon.addEventListener("click", () => {
  cartView.classList.add("active");
  updateCartView();
});

// 🔸 Close Cart View Function
function closeCart() {
  cartView.classList.remove("active");
}

// 🔸 Update Cart View Function
function updateCartView() {
  cartView.innerHTML = `
    <div class="cart-header">
      <h3>Your Cart</h3>
      <button id="closeCartBtn" class="close-cart">&times;</button>
    </div>
  `;

  if (cart.length === 0) {
    cartView.innerHTML += "<p class='empty-cart'>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.src}" alt="">
        <p>${item.desc}</p>
        <button data-index="${index}" class="remove-btn">Remove</button>
      `;
      cartView.appendChild(div);
    });

    const orderBtn = document.createElement("button");
    orderBtn.textContent = "Proceed to Order";
    orderBtn.classList.add("order-btn");
    orderBtn.addEventListener("click", () => {
      localStorage.setItem("cartItems", JSON.stringify(cart));
      window.location.href = "../services/order.html";
    });
    cartView.appendChild(orderBtn);
  }

  // 🔸 Add event listener for Close Button
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);

  // 🔸 Remove Button Handlers
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-index");
      cart.splice(i, 1);
      updateCartCount();
      updateCartView();
    });
  });
}

  // 🔹 Small Add Notification
  function showAddedNotification(itemName) {
    const note = document.createElement("div");
    note.textContent = `${itemName} added to cart!`;
    note.style.position = "fixed";
    note.style.bottom = "20px";
    note.style.right = "20px";
    note.style.background = "#0097a7";
    note.style.color = "#fff";
    note.style.padding = "10px 15px";
    note.style.borderRadius = "6px";
    note.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    note.style.zIndex = "3000";
    document.body.appendChild(note);

    setTimeout(() => note.remove(), 1800);
  }
});
