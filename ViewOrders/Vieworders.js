const orderDateInput = document.getElementById("orderDate");

const formatDate = (date) => {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
  let day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
  return `${year}-${month}-${day}`;
};
const today = new Date();
const todayFormatted = formatDate(today);
orderDateInput.value = todayFormatted;
//////////////////////////////////////////////////////////
let table = document.querySelector("responsive-table");

function codeBuilderTRfororders(Order) {
  let IDOR = document.createElement("td");
  IDOR.innerHTML = Order.id;

  let productid = document.createElement("td");
  productid.innerHTML = Order.productid;

  let QuantityOR = document.createElement("td");
  QuantityOR.innerHTML = Order.Quantity;

  let dataOR = document.createElement("td");
  let orderdate = document.createElement("input");
  orderdate.type = "date";
  dataOR.appendChild(orderdate);

  let amountOR = document.createElement("td");
  amountOR.innerHTML = Order.Amount;

  let statuesOR = document.createElement("td");

  let acceptBtn = document.createElement("button");
  acceptBtn.classList.add("accept");
  acceptBtn.innerHTML = "Accept";

  let rejectBtn = document.createElement("button");
  rejectBtn.classList.add("reject");
  rejectBtn.innerHTML = "Reject";

  statuesOR.appendChild(acceptBtn);
  statuesOR.appendChild(document.createTextNode(" "));
  statuesOR.appendChild(rejectBtn);

  let userID = document.createElement("td");
  userID.innerHTML = Order.userid;

  let row = document.createElement("tr");
  row.appendChild(IDOR);
  row.appendChild(productid);
  row.appendChild(QuantityOR);
  row.appendChild(dataOR);
  row.appendChild(amountOR);
  row.appendChild(statuesOR);
  row.appendChild(userID);

  responsive - table.firstElementChild.appendChild(row);
}

//  Local Storage Classes//

class Order {
  constructor(id, productID, quantity, status, userID) {
    this.id = id;
    this.productID = productID;
    this.quantity = quantity;
    this.status = status;
    this.userID = userID;
  }
}

function categoryNumberCheck() {
  const categoryNumber = document.querySelector(".categoryNumber");
  let categories = localStorage.getItem("category");
  categories = categories ? JSON.parse(categories) : 0;
  categoryNumber.innerText = categories.length;
}
categoryNumberCheck();
