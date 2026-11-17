// SELECT THE BUTTON
const hoursButton = document.getElementById("hours-button");

// SELECT THE OPENING HOURS
const openingHours = document.getElementById("opening-hours");

// LISTEN FOR A CLICK
hoursButton.addEventListener("click", function () {

    openingHours.hidden = !openingHours.hidden;

});
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


// SHOPPING CART
let cart = [];

// SELECT ALL ADD TO CART BUTTONS
const cartButtons = document.querySelectorAll(".add-to-cart");

// SELECT THE CART DISPLAY
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// ADD FOOD TO CART
cartButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const foodName = button.dataset.name;
        const foodPrice = Number(button.dataset.price);

        const existingItem = cart.find(function(item) {
            return item.name === foodName;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: foodName,
                price: foodPrice,
                quantity: 1
            });
        }

        displayCart();
    });
});

// DISPLAY CART ITEMS

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₦${item.price.toLocaleString()}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: ₦${itemTotal.toLocaleString()}</p>

            <button onclick="changeQuantity(${index}, 1)">+</button>
            <button onclick="changeQuantity(${index}, -1)">-</button>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString();
}

// CHANGE FOOD QUANTITY
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// REMOVE FOOD FROM CART
function removeItem(index) {
    cart.splice(index, 1);

    displayCart();
}

// CHECKOUT FORM
const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add meals before checkout.");
        return;
    }

    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const customerAddress = document.getElementById("customer-address").value;

    let orderSummary = "REXORT RESTAURANT ORDER\n\n";

    orderSummary += "Customer: " + customerName + "\n";
    orderSummary += "Phone: " + customerPhone + "\n";
    orderSummary += "Address: " + customerAddress + "\n\n";

    orderSummary += "YOUR MEALS:\n";

    let total = 0;

    cart.forEach(function(item) {
        const subtotal = item.price * item.quantity;

        total += subtotal;

        orderSummary += item.name + " x " + item.quantity +
            " = ₦" + subtotal.toLocaleString() + "\n";
    });

    orderSummary += "\nTotal: ₦" + total.toLocaleString();

    alert(orderSummary);
});

