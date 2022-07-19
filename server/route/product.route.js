const router = require('express').Router();
const product_controller = require('../controller/Produit.controller');

// routes
router.get('/all-produit', product_controller.all_products);
router.post('/create', product_controller.product_create);
//router.get('/:id', product_controller.product_details);
router.get('/show-produit/:id', product_controller.showProduit);
router.put('/update/:id', product_controller.product_update);
router.delete('/delete/:id', product_controller.product_delete);

module.exports = router;