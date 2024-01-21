const signOutBtn = document.getElementById("signout-btn");

signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("Store/index.html");
});

class Order {
  constructor(
    id,
    productID,
    productName,
    productPrice,
    productImage,
    quantity,
    total,
    status,
    userID
  ) {
    this.id = id;
    this.productID = productID;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.quantity = quantity;
    this.total = total;
    this.status = status;
    this.userID = userID;
  }
}
let table = document.querySelector("table");
let cartCheck = document.querySelector(".emptyCart");

getData();

let sub = document.querySelectorAll(".subtract");
let add = document.querySelectorAll(".add");
let deleteItem = document.querySelectorAll(".deleteItem");
let itemQty = document.querySelectorAll(".itemQuantity");
let singlePrice = document.querySelectorAll(".price");
let itemSubtotal = document.querySelectorAll(".subtotal");
let itemsPrices = document.querySelector(".pricesItem");
let discount = document.querySelector(".pricesDiscount");
let shipping = document.querySelector(".pricesShipping");
let totalTotal = document.querySelector(".pricesTotal");
let orderBtn = document.querySelector(".order");
orderBtn.addEventListener("click", placeTempOrder);

updatePriceAll();
for (let ele in sub) {
  sub[ele].addEventListener("click", subtract);
  add[ele].addEventListener("click", addition);
  deleteItem[ele].addEventListener("click", deleteProduct);
  itemQty[ele].addEventListener("keydown", function (e) {
    e.preventDefault();
  });
  itemQty[ele].addEventListener("mousedown", function (e) {
    e.preventDefault();
  });

  updatePrice(itemQty[ele], singlePrice[ele], itemSubtotal[ele]);
}
////////////////////////////////////////////////////////////
function getData() {
  if (sessionStorage.getItem("currentUserID") == null) {
    alert("You are not logged In");
    location.assign("Store/index.html");
  }
  /////////////////////////////////////////////////////////
  let currentUser = sessionStorage.getItem("currentUserID");
  let products = JSON.parse(localStorage.getItem("product")) || [];

  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  for (let entry of shoppingCart) {
    for (let product of products) {
      if (entry.userID == currentUser && product.id == entry.productID) {
        tableRowBuilder(entry, product);
      }
    }
  }
}

/* Code Builder Structure
 
    
 
      <tr>
         <td class="itemDetails">
            <img src="assets/products/electronic1.jpg" alt="">
            <span class="itemTitle">a random laptop that probably sucks</span>
         </td>
         <td class="price">99.99$</td>
         <td class="qty">
            <button class="subtract">-</button>
            <input class="itemQuantity" value="1">
            <button class="add">+</button>
         </td>
         <td class="subtotal">99.99$</td>
         <td class="deleteItem">X</td>
         <td display: none>productID<td>
      </tr>
 
*/

function tableRowBuilder(entry, product) {
  //#region getting Data

  //#endregion

  // #region Creating the title and image TD (td => img , span)

  let detailsTD = document.createElement("td");
  detailsTD.classList.add("itemDetails");

  let img = document.createElement("img");
  img.src = `${product.image}`; // it will be dynamic here

  let span = document.createElement("span");
  span.innerHTML = `${product.name}`; // it will be dynamic here
  span.classList.add("itemTitle");

  detailsTD.appendChild(img);
  detailsTD.appendChild(span);

  // #endregion

  // #region Creating a Single Item Price TD (td => price)

  let priceTD = document.createElement("td");
  priceTD.classList.add("price");
  priceTD.innerHTML = `${product.price}$`; // it will be dynamic here

  //#endregion

  // #region Creating the quantity input with its buttons
  // (td => subBtn , input , addBtn)

  let qtyTD = document.createElement("td");
  qtyTD.classList.add("qty");

  let subBtn = document.createElement("button");
  subBtn.classList.add("subtract");
  subBtn.innerHTML = `-`;

  let quantityInput = document.createElement("input");
  quantityInput.classList.add("itemQuantity");
  quantityInput.value = entry.quantity; // this will be dynamic

  let addBtn = document.createElement("button");
  addBtn.classList.add("add");
  addBtn.innerHTML = `+`;

  qtyTD.appendChild(subBtn);
  qtyTD.appendChild(document.createTextNode(" "));
  qtyTD.appendChild(quantityInput);
  qtyTD.appendChild(document.createTextNode(" "));
  qtyTD.appendChild(addBtn);
  /* this is important because for some reason
   document create element does it like this
   <ele></ele><ele></ele> 
   instead of 
   <ele></ele> <ele></ele>
    THAT LITTLE SPACE BETWEEN IS IMPORTANT */

  // #endregion

  // #region Creating the subtotal for a single item and delete button
  // (td => subtotal , td => delete button)

  let subtotalTD = document.createElement("td");
  subtotalTD.classList.add("subtotal");
  subtotalTD.innerHTML = `${entry.quantity * product.price}$`; // this will be dynamic

  let deleteTD = document.createElement("td");
  deleteTD.classList.add("deleteItem");
  deleteTD.innerHTML = `X`;

  let entryIDTD = document.createElement("td");
  entryIDTD.innerHTML = entry.id;
  entryIDTD.setAttribute("style", "display:none");

  // #endregion

  // #region Product ID

  // #endregion

  // #region Appending all td to tr and table
  // (td.All => tr => table)

  let trElement = document.createElement("tr");
  trElement.appendChild(detailsTD);

  trElement.appendChild(priceTD);
  trElement.appendChild(qtyTD);
  trElement.appendChild(subtotalTD);
  trElement.appendChild(deleteTD);
  trElement.appendChild(entryIDTD);
  table.firstElementChild.appendChild(trElement);

  // #endregion
}

function updatePrice(itemQuantity, singleItem, totalItem) {
  let singleItemValue = parseFloat(singleItem.innerText);
  let quantity = itemQuantity.value;
  let total = singleItemValue * quantity;
  total = total.toFixed(2);
  totalItem.innerText = `${total}$`;
  updatePriceAll();
}

function updatePriceAll() {
  let total = 0;
  itemSubtotal.forEach((x) => {
    total += parseFloat(x.innerText);
  });
  totalTotal.innerHTML = `${total.toFixed(2)}$`;

  if (total > 0) {
    cartCheck.innerHTML = "";
    orderBtn.style.display = "block";
    totalTotal.innerHTML = `${total.toFixed(2)}$`;
  } else {
    cartCheck.innerHTML = "No items in the cart to order";
    orderBtn.style.display = "none";
    totalTotal.innerHTML = `0.00$`;
  }
}

function addition(e) {
  let entryID =
    e.target.parentElement.nextElementSibling.nextElementSibling
      .nextElementSibling.innerHTML;
  let itemQuantity = e.target.previousElementSibling;
  if (itemQuantity.value < 10) {
    itemQuantity.value++;
  }
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  for (let entry of shoppingCart) {
    if (entry.id == entryID) {
      entry.quantity = itemQuantity.value;
    }
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  let singleItem = e.target.parentElement.previousElementSibling;
  let totalItem = e.target.parentElement.nextElementSibling;
  updatePrice(itemQuantity, singleItem, totalItem);
}

function subtract(e) {
  let entryID =
    e.target.parentElement.nextElementSibling.nextElementSibling
      .nextElementSibling.innerHTML;
  let itemQuantity = e.target.nextElementSibling;
  if (itemQuantity.value > 1) {
    itemQuantity.value--;
  }
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  for (let entry of shoppingCart) {
    if (entry.id == entryID) {
      entry.quantity = itemQuantity.value;
    }
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  let singleItem = e.target.parentElement.previousElementSibling;
  let totalItem = e.target.parentElement.nextElementSibling;
  updatePrice(itemQuantity, singleItem, totalItem);
}

function deleteProduct(e) {
  // Remember to remove data from local storage
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let entryID = Number(e.target.nextElementSibling.innerHTML);

  for (let entry in shoppingCart) {
    if (shoppingCart[entry].id == entryID) {
      shoppingCart.splice(entry, 1);
    }
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  let total = parseFloat(totalTotal.innerText);
  console.log(e.target.previousElementSibling);
  total -= parseFloat(e.target.previousElementSibling.innerText);
  totalTotal.innerHTML = `${total.toFixed(2)}$`;
  e.target.parentElement.remove();
  itemSubtotal = document.querySelectorAll(".subtotal");
  updatePriceAll();
}

function placeTempOrder() {
  let allTrs = document.querySelectorAll("tr");

  orderNumber = allTrs.length - 1;

  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let products = JSON.parse(localStorage.getItem("product")) || [];
  let count = 1;
  for (let cart of shoppingCart) {
    for (let prod of products) {
      if (
        cart.productID == prod.id &&
        cart.userID == sessionStorage.getItem("currentUserID")
      ) {
        let cartPrice = parseFloat(allTrs[count++].childNodes[1].innerHTML);
        if (!(cartPrice == prod.price)) {
          alert("A product price have been updated, reloading the page");
          location.reload();
        }
        console.log(Number(cart.quantity) > Number(prod.quantity));
        if (Number(cart.quantity) > Number(prod.quantity)) {
          alert(
            `the "${prod.name}" product has only ${prod.quantity} units, please lower your order quantity`
          );
          return;
        }
      }
    }
  }
  let cartCount = shoppingCart.filter(
    (item) => item.userID == sessionStorage.getItem("currentUserID")
  );
  cartCount = cartCount.length;
  if (cartCount != orderNumber) {
    alert("A product may have been deleted, refreshing now");
    location.reload();
    return;
  }

  let userOrder = [];
  for (let cart of shoppingCart) {
    for (let prod of products) {
      if (
        cart.productID == prod.id &&
        cart.userID == sessionStorage.getItem("currentUserID")
      ) {
        let orderID = localStorage.getItem("orderID") || 0;
        localStorage.setItem("orderID", Number(orderID) + 1);
        let orderItem = new Order(
          orderID,
          cart.productID,
          prod.name,
          prod.price,
          prod.image,
          cart.quantity,
          Number(prod.price) * Number(cart.quantity),
          "Pending",
          cart.userID
        );
        userOrder.push(orderItem);
      }
    }
  }

  console.log(userOrder);
  sessionStorage.setItem("order", JSON.stringify(userOrder));
  location.assign("address.html");
}
