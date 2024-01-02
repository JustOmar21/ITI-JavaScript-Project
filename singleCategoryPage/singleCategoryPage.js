let container = document.querySelector(".containerCategory");

console.log(container);

getData();

function getData() {

   let categoryTitle = document.querySelector(".productName");
   let gallary = document.querySelector(".gallary");

   let categories = localStorage.getItem("category");
   categories = JSON.parse(categories) || [];
   

   let categoryID = localStorage.getItem("selectedCatID");
   if(categoryID == null)
   {
      alert("you cannot access this page directly, please enter from the categories page");
      location.assign("../categoryPage/categorypage.html");
   }

   for(let singleCat of categories)
   {
      if(singleCat.id == categoryID)
      {
         categoryTitle.innerHTML = singleCat.name;
      }
   }

   let products = localStorage.getItem("product");
   products = JSON.parse(products) || [];

   for(let prod of products)
   {
      if(prod.categoryID == categoryID)
      {
         productBuilder(prod , gallary)
      }
   }

}

function productBuilder(prod, gallaryDiv) {
   let productDiv = document.createElement("div");
   productDiv.classList.add("contant");

   let productImg = document.createElement("img");
   productImg.classList.add("images");
   productImg.src = prod.image;

   let productName = document.createElement("h3");
   productName.innerHTML = prod.name;

   let productDesc = document.createElement("p");
   productDesc.innerHTML = prod.description;

   let productPrice = document.createElement("h6");
   productPrice.innerHTML = `${prod.price}$`;

   let cartBtn = document.createElement("button");
   cartBtn.classList.add("Addtocart");
   cartBtn.innerHTML = "Add to Cart";

   productDiv.appendChild(productImg);
   productDiv.appendChild(productName);
   productDiv.appendChild(productDesc);
   productDiv.appendChild(productPrice);
   productDiv.appendChild(cartBtn);

   gallaryDiv.appendChild(productDiv);
}
