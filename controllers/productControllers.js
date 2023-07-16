const {Product, Order}  = require('../models/user');

async function createProduct(req, res) {
  const { name, description, price, isActive } = req.body;

  try {
      if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      isActive,
    });

    await newProduct.save();

    return res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error during product creation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function AllProducts(req, res) {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error during retrieving products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function AllActiveProducts(req, res) {
  try {
    const activeProducts = await Product.find({ isActive: true });

    return res.status(200).json(activeProducts);
  } catch (error) {
    console.error('Error during retrieving active products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createOrder(req, res) {
  const { userId, products } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let totalAmount = 0;
    for (const product of products) {
      const { productId, quantity } = product;
      const productInfo = await Product.findById(productId);
      if (!productInfo) {
        return res.status(404).json({ error: `Product not found: ${productId}` });
      }
      totalAmount += productInfo.price * quantity;
    }

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      purchasedOn: new Date(),
    });

    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error during order creation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllOrders(req, res) {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find();

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error during retrieving orders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


async function archiveProduct(req, res) {
  const { productId } = req.params;

  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.isActive = false;
    await product.save();

    return res.status(200).json({ message: 'Product archived successfully' });
  } catch (error) {
    console.error('Error during product archiving:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports.archiveProduct = archiveProduct;
module.exports.createOrder = createOrder;
module.exports.newOrder = getAllOrders;
module.exports.createProduct = createProduct;
module.exports.AllProducts = AllProducts;
module.exports.AllActiveProducts = AllActiveProducts;