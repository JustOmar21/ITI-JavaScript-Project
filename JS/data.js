class User {
   constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
   }
}

class ShippingInfo {

   constructor(street, city, state, zipcode, country, phone, userID) {
      this.street = street;
      this.city = city;
      this.state = state;
      this.zipcode = zipcode;
      this.country = country;
      this.phone = phone;
      this.userID = userID;
   }
}

class Category {

   constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
   }

}

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

class ShoppingCart {

   constructor(id, productID, quantity, userID) {
      this.id = id;
      this.productID = productID;
      this.quantity = quantity;
      this.userID = userID;
   }
}

class Order {

   constructor(id, productID, productName , productPrice , productImage, quantity, total, status , userID) {
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

class Wishlist {

   constructor(id, productID, userID) {
      this.id = id;
      this.productID = productID;
      this.userID = userID;
   }
}