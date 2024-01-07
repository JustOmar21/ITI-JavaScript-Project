const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("../Store/index.html");
});

let table = document.querySelector(".table");

getData();

function getData() {
  if (sessionStorage.getItem("currentUserID") == null) {
    alert("You are not logged In");
    location.assign("../Store/index.html");
  }
  let currentUser = sessionStorage.getItem("currentUserID");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let products = JSON.parse(localStorage.getItem("product")) || [];

  for (let wish of wishlist) {
    for (let prod of products) {
      if (wish.userID == currentUser && wish.productID == prod.id) {
        wishBuilder(wish, prod);
      }
    }
  }
}

function wishBuilder(wish, product) {
  let nameTD = document.createElement("td");
  nameTD.classList.add("itemDetails");

  let img = document.createElement("img");
  img.src = product.image;

  let itemName = document.createElement("span");
  itemName.innerHTML = product.name;
  itemName.classList.add("itemTitle");

  nameTD.appendChild(img);
  nameTD.appendChild(itemName);

  let priceTD = document.createElement("td");
  priceTD.innerHTML = `${product.price}`;

  let operationTD = document.createElement("td");
  operationTD.classList.add("operation");

  let cartBtn = document.createElement("button");
  cartBtn.classList.add("add");
  let cartIcon = document.createElement("i");
  cartIcon.classList.add("fa-solid");
  cartIcon.classList.add("fa-cart-shopping");
  cartBtn.addEventListener("click", addCart);
  cartBtn.appendChild(cartIcon);

  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  let removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid");
  removeIcon.classList.add("fa-xmark");
  removeBtn.addEventListener("click", deleteWish);
  removeBtn.appendChild(removeIcon);

  operationTD.appendChild(cartBtn);
  operationTD.appendChild(document.createTextNode(" "));
  operationTD.appendChild(removeBtn);

  let wishTD = document.createElement("td");
  wishTD.classList.add("wishID");
  wishTD.innerHTML = `${wish.id}`;

  let tr = document.createElement("tr");

  tr.appendChild(nameTD);
  tr.appendChild(priceTD);
  tr.appendChild(operationTD);
  tr.appendChild(wishTD);

  table.appendChild(tr);
}

function addCart(e) {
  let wishID = e.currentTarget.parentElement.nextElementSibling.innerHTML;
  let wishlists = JSON.parse(localStorage.getItem("wishlist")) || [];
  let wish = wishlists.filter((singleWish) => singleWish.id == wishID)[0];
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  if (
    !shoppingCart.some((cart) => {
      return (
        cart.productID == wish.productID &&
        cart.userID == sessionStorage.getItem("currentUserID")
      );
    })
  ) {
    let cartID = localStorage.getItem("cartID") || 0;
    localStorage.setItem("cartID", Number(cartID) + 1);
    let item = new ShoppingCart(
      cartID,
      wish.productID,
      1,
      sessionStorage.getItem("currentUserID")
    );
    shoppingCart.push(item);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    deleteWish(e);
  } else {
    alert("You already added this item to the shopping cart before");
  }
}

function deleteWish(e) {
  let wishID = e.currentTarget.parentElement.nextElementSibling.innerHTML;
  e.currentTarget.parentElement.parentElement.remove();
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  for (let wish in wishlist) {
    if (wishlist[wish].id == wishID) {
      wishlist.splice(wish, 1);
    }
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

class ShoppingCart {
  constructor(id, productID, quantity, userID) {
    this.id = id;
    this.productID = productID;
    this.quantity = quantity;
    this.userID = userID;
  }
}
