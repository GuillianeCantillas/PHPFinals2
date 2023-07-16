const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const userController = require('../controllers/userControllers');
const auth = require('../auth');

router.post('/', authenticateUser, productController.createProduct);

router.get('/', productController.AllProducts);
router.get('/:id', productController.AllActiveProducts);


// API endpoint for creating a new order (requires authentication)
router.post('/', authenticateUser, orderController.createOrder);

// API endpoint for retrieving all orders (Admin only)
router.get('/', authenticateUser, orderController.getAllOrders);


module.exports = router;


module.exports = router;