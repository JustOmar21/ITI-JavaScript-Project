const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("Store/index.html");
});

let table = document.querySelector("table");

getData();
///////////////////////////////////////////////////////////////
if (sessionStorage.getItem("currentUserID") == null) {
  alert("You are not logged In");
  location.assign("Store/index.html");
}
///////////////////////////////////////////////////////////
function getData() {
  let orders = JSON.parse(localStorage.getItem("order"));
  orders = orders.reverse();
  for (let order of orders) {
   if(order.userID == sessionStorage.getItem("currentUserID"));
    codeBuilderTRfororders(order);
  }
}

function codeBuilderTRfororders(Order) {
  let IDOR = document.createElement("td");
  IDOR.innerHTML = Order.id;

  let productName = document.createElement("td");
  productName.classList.add("itemDetails");

  let img = document.createElement("img");
  img.src = `${Order.productImage}`; // it will be dynamic here

  let span = document.createElement("span");
  span.innerHTML = `${Order.productName}`; // it will be dynamic here

  productName.appendChild(img);
  productName.appendChild(span);

  let QuantityOR = document.createElement("td");
  QuantityOR.innerHTML = Order.quantity;

  let amountOR = document.createElement("td");
  amountOR.innerHTML = `${Order.total}$`;

  let statuesOR = document.createElement("td");

  if (Order.status == "Rejected") {
    statuesOR.style.color = "red";
  } else if (Order.status == "Accepted") {
    statuesOR.style.color = "green";
  } else {
    statuesOR.style.color = "blue";
  }
  statuesOR.innerHTML = Order.status;

  let row = document.createElement("tr");
  row.appendChild(IDOR);
  row.appendChild(productName);
  row.appendChild(QuantityOR);
  row.appendChild(amountOR);
  row.appendChild(statuesOR);

  table.firstElementChild.appendChild(row);
}
