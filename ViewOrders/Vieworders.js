let table = document.querySelector(".responsive-table");

function getData() {
   let orders = JSON.parse(localStorage.getItem("order"));
   orders = orders.reverse()
   for (let order of orders) {
      codeBuilderTRfororders(order);
   }
}


getData();
//////////////////////////////////////////////////////////-/-////////////


function codeBuilderTRfororders(Order) {
   let IDOR = document.createElement("td");
   IDOR.innerHTML = Order.id;

   let productName = document.createElement("td");
   productName.classList.add("itemDetails");

   let img = document.createElement("img");
   img.src = `${Order.productImage}` // it will be dynamic here

   let span = document.createElement("span");
   span.innerHTML = `${Order.productName}` // it will be dynamic here

   productName.appendChild(img);
   productName.appendChild(span);

   let QuantityOR = document.createElement("td");
   QuantityOR.innerHTML = Order.quantity;

   let amountOR = document.createElement("td");
   amountOR.innerHTML = `${Order.total}$`;

   let statuesOR = document.createElement("td");

   if (Order.status == "Pending") {

      let acceptBtn = document.createElement("button");
      acceptBtn.classList.add("accept");
      acceptBtn.innerHTML = "Accept";
      acceptBtn.addEventListener("click", acceptOrder);

      let rejectBtn = document.createElement("button");
      rejectBtn.classList.add("reject");
      rejectBtn.innerHTML = "Reject";
      rejectBtn.addEventListener("click", rejectOrder);

      statuesOR.appendChild(acceptBtn);
      statuesOR.appendChild(document.createTextNode(" "));
      statuesOR.appendChild(rejectBtn);
   }
   else {
      if (Order.status == "Rejected") {
         statuesOR.style.color = "red";
      }
      else {
         statuesOR.style.color = "green";
      }
      statuesOR.innerHTML = Order.status;
   }



   let userID = document.createElement("td");
   userID.innerHTML = Order.userID;

   let row = document.createElement("tr");
   row.appendChild(IDOR);
   row.appendChild(productName);
   row.appendChild(QuantityOR);
   row.appendChild(amountOR);
   row.appendChild(statuesOR);
   row.appendChild(userID);

   table.firstElementChild.appendChild(row);
}


function acceptOrder(e) {
   let orderID = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
   let orders = JSON.parse(localStorage.getItem("order")) || [];
   for (let order of orders) {
      if (order.id == orderID) {
         order.status = "Accepted";
         break;
      }
   }
   localStorage.setItem("order", JSON.stringify(orders));
   location.reload();
}


function rejectOrder(e) {
   let orderID = e.currentTarget.parentElement.parentElement.childNodes[0].innerHTML;
   let orders = JSON.parse(localStorage.getItem("order")) || [];
   let products = JSON.parse(localStorage.getItem("product")) || [];
   for (let order of orders) {
      if (order.id == orderID) {
         order.status = "Rejected";

         for (let prod of products) {
            if (prod.id == order.productID) {
               prod.quantity += Number(order.quantity);
               break;
            }
         }
         break;
      }
   }
   localStorage.setItem("product", JSON.stringify(products));
   localStorage.setItem("order", JSON.stringify(orders));
   location.reload();
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

// function categoryNumberCheck() {
//    const categoryNumber = document.querySelector(".categoryNumber");
//    let categories = localStorage.getItem("category");
//    categories = categories ? JSON.parse(categories) : 0;
//    categoryNumber.innerText = categories.length;
// }
// categoryNumberCheck();
