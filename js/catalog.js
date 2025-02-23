/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

console.log(cart);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  let selectElement = document.getElementById('items');
  for (var i = 0; i < Product.allProducts.length; i++) {
    
    let optionEl=document.createElement('option')
    optionEl.textContent=Product.allProducts[i].name;
    selectElement.appendChild(optionEl);
    optionEl.setAttribute("value", Product.allProducts[i].name);


  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(event) {
  // TODO: suss out the item picked from the select list
  let productAdd = event.target[1].value;
  // console.log(event.target[1].value);
  // TODO: get the quantity
  let quantityAdd = parseInt(event.target[2].value);
  console.log(event.target[2].value);
  // TODO: using those, add one item to the Cart
  cart.addItem(productAdd, quantityAdd);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  document.getElementById('itemCount').textContent = ` ${cart.items.length}`;
  console.log(cart.items);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  let productAdd = event.target[1].value;
  let quantityadd = Math.floor(event.target[2].value);
  // TODO: Add a new element to the cartContents div with that information
  let cartEl = document.getElementById('cartContents');
  let cartEl2 = document.createElement('p');
  cartEl2.textContent = `${productAdd}: x  ${quantityadd}`;
  cartEl.appendChild(cartEl2);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();