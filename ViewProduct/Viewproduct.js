let table = document.querySelector(".responsive-table");


getData();
function getData() {
   let products = localStorage.getItem("product");
   products = products ? JSON.parse(products) : [];
   for (let prod of products) {
      codeBuilderTRfororders(prod);
   }
}

function codeBuilderTRfororders(product) {
   let IDPR = document.createElement("td");
   IDPR.innerHTML = product.id;

   let namePR = document.createElement("td");
   namePR.innerHTML = product.name;

   let imgPR = document.createElement("td");
   let productimage = document.createElement("img");
   productimage.src = product.image;
   imgPR.appendChild(productimage);

   let pricePR = document.createElement("td");
   pricePR.innerHTML = `${product.price}$`;

   let descPR = document.createElement("td");
   descPR.innerHTML = product.description;


   let QuantityPR = document.createElement("td");
   QuantityPR.innerHTML = `${product.quantity} Unit`;

   let categoryIDPR = document.createElement("td");
   let categories = localStorage.getItem("category");
   categories = categories ? JSON.parse(categories) : [];
   for (let singleCat of categories) {
      if (singleCat.id == product.categoryID) {
         categoryIDPR.innerHTML = singleCat.name;
      }
   }


   let operationPR = document.createElement("td");

   let editBtn = document.createElement("button");
   editBtn.classList.add("edit");
   editBtn.addEventListener("click", updateProduct);
   editBtn.innerHTML = "Edit";

   let deleteBtn = document.createElement("button");
   deleteBtn.classList.add("delete");
   deleteBtn.addEventListener("click", removeProduct)
   deleteBtn.innerHTML = "Delete";

   operationPR.appendChild(editBtn);
   operationPR.appendChild(document.createTextNode(" "));
   operationPR.appendChild(deleteBtn);

   let row = document.createElement("tr");
   row.appendChild(IDPR);
   row.appendChild(namePR);
   row.appendChild(imgPR);
   row.appendChild(pricePR);
   row.appendChild(descPR);
   row.appendChild(QuantityPR);
   row.appendChild(categoryIDPR);
   row.appendChild(operationPR);
   table.firstElementChild.appendChild(row);
}

//  Local Storage Classes//
class Product {
   constructor(id, name, image, price, description, quantity, categoryID) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.price = price;
      this.description = description;
      this.quantity = quantity;
      this.categoryID = categoryID;
   }
}

// function categoryNumberCheck() {
//    const categoryNumber = document.querySelector(".categoryNumber");
//    let categories = localStorage.getItem("category");
//    categories = categories ? JSON.parse(categories) : 0;
//    categoryNumber.innerText = categories.length;
// }
// categoryNumberCheck();

function updateProduct(e) {
   let prodID = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
   localStorage.setItem("updateProdID", prodID);
   location.assign("../UpdateProduct/updateProduct.html");
}

function removeProduct(e) {
   let prodID = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
   e.target.parentElement.parentElement.remove();
   let products = localStorage.getItem("product");
   products = products ? JSON.parse(products) : [];
   for (let singleProduct in products) {
      if (prodID == products[singleProduct].id) {
         removeWish(products[singleProduct]);
         removeCart(products[singleProduct]);
         products.splice(singleProduct, 1);
      }
   }
   localStorage.setItem("product", JSON.stringify(products));
}

function removeCart(singleProduct)
{
   let shoppingCart = localStorage.getItem("shoppingCart");
   shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : [];
   for (let singleCart in shoppingCart) {
      if (singleProduct.id == shoppingCart[singleCart].productID) {
         shoppingCart.splice(singleCart, 1);
      }
   }
   localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function removeWish(singleProduct) {
   let wishlists = localStorage.getItem("wishlist");
   wishlists = wishlists ? JSON.parse(wishlists) : [];
   for (let singleWish in wishlists) {
      if (singleProduct.id == wishlists[singleWish].productID) {
         wishlists.splice(singleWish, 1);
      }
   }
   localStorage.setItem("wishlist", JSON.stringify(wishlists));
}