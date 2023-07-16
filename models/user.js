const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  orderedProducts: [{
    products: [{
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true }
    }]
  }],
  totalAmount: { type: Number, default: 0 },
  purchasedOn: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now },
  userOrders: [{
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderId: { type: String }
  }]
});


const User = mongoose.model('User', userSchema); //User
const Product = mongoose.model('Product', productSchema); //Product

module.exports = { User, Product };
module.exports = mongoose.model("User", userSchema);
