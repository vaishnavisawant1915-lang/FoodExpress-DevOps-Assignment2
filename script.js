let cart = [];


// ===============================
// User Registration
// ===============================

function openRegistration() {
    document.getElementById("registrationModal").style.display = "flex";
}

function closeRegistration() {
    document.getElementById("registrationModal").style.display = "none";
}

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("userName").value;

    alert(
        "Registration successful! Welcome " + name + " 🎉"
    );

    closeRegistration();

    document.querySelector("form").reset();
}


// ===============================
// Restaurant Search
// ===============================

function searchRestaurants() {

    const searchValue =
        document
            .getElementById("restaurantSearch")
            .value
            .toLowerCase();

    const restaurants =
        document.querySelectorAll(".restaurant-card");

    restaurants.forEach(function(restaurant) {

        const name =
            restaurant
                .getAttribute("data-name")
                .toLowerCase();

        if (name.includes(searchValue)) {
            restaurant.style.display = "block";
        } else {
            restaurant.style.display = "none";
        }

    });
}


// ===============================
// View Food Menu
// ===============================

function viewMenu(restaurantName) {

    document.getElementById("menuTitle").textContent =
        "🍴 " + restaurantName + " - Food Menu";

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// Add Food to Cart
// ===============================

function addToCart(foodName, price) {

    const existingItem =
        cart.find(function(item) {
            return item.name === foodName;
        });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: foodName,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(foodName + " added to cart! 🛒");
}


// ===============================
// Update Cart
// ===============================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const totalItems =
        cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

    cartCount.textContent = totalItems;
}


// ===============================
// Open Cart
// ===============================

function openCart() {

    displayCart();

    document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {

    document.getElementById("cartModal").style.display = "none";
}


// ===============================
// Display Cart Items
// ===============================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty. 🍽️</p>";

        cartTotal.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${item.price} × ${item.quantity}
            </div>

            <div>
                <strong>₹${itemTotal}</strong>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.textContent = total;
}


// ===============================
// Remove from Cart
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    displayCart();
}


// ===============================
// Place Order
// ===============================

function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food first."
        );

        return;
    }

    const orderTotal =
        cart.reduce(function(total, item) {

            return total +
                (item.price * item.quantity);

        }, 0);

    alert(
        "Order placed successfully! 🎉\n\n" +
        "Order Total: ₹" + orderTotal
    );

    cart = [];

    updateCart();

    closeCart();

    startTracking();
}


// ===============================
// Track Order
// ===============================

function startTracking() {

    const steps =
        document.querySelectorAll(".status-step");

    const message =
        document.getElementById("trackingMessage");

    let currentStep = 0;

    steps.forEach(function(step) {
        step.classList.remove("active");
    });

    steps[0].classList.add("active");

    message.textContent =
        "Your order has been placed successfully! 📦";

    const trackingMessages = [
        "Order placed successfully! 📦",
        "Restaurant is preparing your food. 👨‍🍳",
        "Your order is out for delivery. 🛵",
        "Order delivered successfully! 🎉"
    ];

    const interval =
        setInterval(function() {

            currentStep++;

            if (currentStep < steps.length) {

                steps[currentStep]
                    .classList.add("active");

                message.textContent =
                    trackingMessages[currentStep];

            } else {

                clearInterval(interval);

            }

        }, 3000);
}


// ===============================
// Scroll to Restaurants
// ===============================

function scrollToRestaurants() {

    document
        .getElementById("restaurants")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// Close modal when clicking outside
// ===============================

window.onclick = function(event) {

    const registrationModal =
        document.getElementById("registrationModal");

    const cartModal =
        document.getElementById("cartModal");

    if (event.target === registrationModal) {
        closeRegistration();
    }

    if (event.target === cartModal) {
        closeCart();
    }
};