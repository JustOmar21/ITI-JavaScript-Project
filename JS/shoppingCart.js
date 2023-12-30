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

let table = document.querySelector("table");
let cartCheck = document.querySelector(".emptyCart");


for (let ele in sub) {

    sub[ele].addEventListener("click", subtract);
    add[ele].addEventListener("click", addition);
    deleteItem[ele].addEventListener("click", deleteProduct);
    itemQty[ele].addEventListener("keydown", function (e) { e.preventDefault(); });
    itemQty[ele].addEventListener("mousedown", function (e) { e.preventDefault(); });

    updatePrice(itemQty[ele], singlePrice[ele], itemSubtotal[ele]);
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
    </tr>

*/

function tableRowBuilder() {
    // #region Creating the title and image TD (td => img , span)

    let detailsTD = document.createElement("td");
    detailsTD.classList.add("itemDetails");

    let img = document.createElement("img");
    img.src = `assets/products/electronic1.jpg` // it will be dynamic here

    let span = document.createElement("span");
    span.innerHTML = "a random laptop that probably sucks" // it will be dynamic here
    span.classList.add("itemTitle");

    detailsTD.appendChild(img);
    detailsTD.appendChild(span);

    // #endregion

    // #region Creating a Single Item Price TD (td => price)

    let priceTD = document.createElement("td");
    priceTD.classList.add("price");
    priceTD.innerHTML = `99.99$`; // it will be dynamic here

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
    quantityInput.value = 3; // this will be dynamic

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
    subtotalTD.innerHTML = `99.99$`; // this will be dynamic

    let deleteTD = document.createElement("td");
    deleteTD.classList.add("deleteItem");
    deleteTD.innerHTML = `X`;

    // #endregion

    // #region Appending all td to tr and table
    // (td.All => tr => table)

    let trElement = document.createElement("tr");
    trElement.appendChild(detailsTD);
    trElement.appendChild(priceTD);
    trElement.appendChild(qtyTD);
    trElement.appendChild(subtotalTD);
    trElement.appendChild(deleteTD);
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
    })
    itemsPrices.innerHTML = `${total.toFixed(2)}$`;
    total += parseFloat(discount.innerText) + parseFloat(shipping.innerText);

    if (total > 0) {
        cartCheck.innerHTML = "";
        orderBtn.style.display = "block";
        totalTotal.innerHTML = `${total.toFixed(2)}$`;
    }
    else {
        cartCheck.innerHTML = "No items in the cart to order";
        orderBtn.style.display = "none";
        totalTotal.innerHTML = `0.00$`;
    }

}

function addition(e) {
    let itemQuantity = e.target.previousElementSibling
    if (itemQuantity.value < 10) {
        itemQuantity.value++;
    }
    let singleItem = e.target.parentElement.previousElementSibling;
    let totalItem = e.target.parentElement.nextElementSibling;
    updatePrice(itemQuantity, singleItem, totalItem);
}

function subtract(e) {
    let itemQuantity = e.target.nextElementSibling
    if (itemQuantity.value > 1) {
        itemQuantity.value--;
    }
    let singleItem = e.target.parentElement.previousElementSibling;
    let totalItem = e.target.parentElement.nextElementSibling;
    updatePrice(itemQuantity, singleItem, totalItem);
}

function deleteProduct(e) {
    // Remember to remove data from local storage

    let total = parseFloat(itemsPrices.innerText);
    console.log(e.target.previousElementSibling);
    total -= parseFloat(e.target.previousElementSibling.innerText);
    itemsPrices.innerHTML = `${total.toFixed(2)}$`;
    e.target.parentElement.remove();
    itemSubtotal = document.querySelectorAll(".subtotal");
    updatePriceAll();
}