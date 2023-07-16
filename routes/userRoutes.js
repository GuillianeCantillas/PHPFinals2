const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const ProductController  = require('../controllers/productControllers');
const auth = require('../auth');


router.post('/auth', (req,res) => {
	userController.authenticateUser({userId : req.body.id})
	.then(resultFromController => res.send(resultFromController));
});

router.post('/register', (req, res) => {
	userController.registerUser(req.body)
	.then(resultFromController => res.send(resultFromController))
});

router.post('/login', (req, res) => {
	userController.loginUser(req.body)
	.then(resultFromController => res.send(resultFromController))
});

router.post('/details', (req,res) => {
	userController.getProfile({userId : req.body.id})
	.then(resultFromController => res.send(resultFromController));
});

router.get('/products', (req, res) => {
  productController.AllProducts({ userId: req.body.id })
    .then(resultFromController => res.send(resultFromController))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
});

router.put('/products', (req, res) => {
  productController.createProduct({ userId: req.body.id })
    .then(resultFromController => res.send(resultFromController))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
});

router.put('/archive', (req, res) => {
  productController.archiveProducts({ userId: req.body.id })
    .then(resultFromController => res.send(resultFromController))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
});

module.exports = router;
