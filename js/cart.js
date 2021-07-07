/* global Cart */
"use strict";

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById("cart");
// table.addEventListener("click", removeItemFromCart);
let cart;



// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}



function loadCart() {
  let initCart = JSON.parse(localStorage.getItem('data'));
  let cartItemsArray = [];
  for (let i = 0; i < initCart.items.length; i++) {
    cartItemsArray.push(
      new CartItem(initCart.items[i].product, initCart.items[i].quantity, i)
    );
  }
  cart = new Cart(cartItemsArray);
  console.log(cart);
}



// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let toClear = document.querySelectorAll('#cart tbody tr');
  for (let i = 0; i < toClear.length; i++) {
    if(toClear[i]){
      toClear[i].remove();
    }
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  let cartTables = document
    .getElementById("cart")
    .getElementsByTagName("tbody");

  for (let i = 0; i < 1; i++) {
    let cartTable = cartTables[i];

    // TODO: Iterate over the items in the cart

    for (let j = 0; j < cart.items.length; j++) {
      // TODO: Create a TR
      // TODO: Create a TD for the delete link, quantity,  and the item
      // TODO: Add the TR to the TBODY and each of the TD's to the TR
      let newRowEl = document.createElement("tr");
      let deleteTDEl = document.createElement("td");
      deleteTDEl.setAttribute("id", cart.items[j].product);
      let anEl = document.createElement("a");
      anEl.setAttribute("href", "#delete-link");
      anEl.setAttribute("id", j);
      anEl.addEventListener("click", removeItemFromCart);
      anEl.innerHTML = "X";
      anEl.style = "color:red; font-size:1.1pc; font-weight: bold; ";
      deleteTDEl.appendChild(anEl);
      newRowEl.appendChild(deleteTDEl);

      let qtyTDEl = document.createElement("td");
      qtyTDEl.innerText = cart.items[j].quantity;
      newRowEl.appendChild(qtyTDEl);

      let itemTDEl = document.createElement("td");
      itemTDEl.innerText = cart.items[j].product;
      newRowEl.appendChild(itemTDEl);

      cartTable.appendChild(newRowEl);
    }
  }
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  event.preventDefault();
  let itemToRemove = event.target.id;
  cart.removeItem(cart.items[event.target.id]);
  
  cart.saveToLocalStorage();
  
  renderCart();
}

const btn = document.getElementById("processOrder");
btn.addEventListener("click", removeAllItems);
function removeAllItems(event) {
  event.preventDefault();
  cart.removeAllItems();

  document.getElementById("name").value = '';
  document.getElementById("street").value = '';
  document.getElementById("city").value = '';
  document.getElementById("state").value = '';
  document.getElementById("zipCode").value = '';
  document.getElementById("phoneNumber").value = '';
  document.getElementById("ccNumber").value = '';
document.getElementById('alertMsg').style="display: block;";
  
  cart.saveToLocalStorage();
  
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
