const Product = require('../models/products');
const ObjectId= require("mongoose").Types.ObjectId;

// create a new Product.
module.exports.product_create = function (req, res) {
    // validate request
    if(!req.body.Name || !req.body.Prix || !req.body.Description || !req.body.Poids || !req.body.Image) {
        return res.status(400).send({
            success: false,
            message: "Entrer un produit svp "
        });
    }

    // create a product
    let product = new Product(
        { 
           Description:req.body.Description,
           Poids : req.body.Poids,
           Prix: req.body.Prix,
           Name: req.body.Name,
           Image : req.body.Image
      
        }
    );

    // save product in the database.
    product.save()
        .then(data => {
            res.send({
                success: true,
                message: 'Product successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "une erreur est produite lors de la creation du produit"
        });
    });
};

// return all products.
module.exports.all_products = async (req, res) => {
   const products = await Product.find();
   res.status(200).json({
    message: "Retrived sucessfully",
    products
   })
};

// find a single product with a id.
module.exports.product_details = async (req, res) => {
   await Product.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Product successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Product not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving product with id " + req.params.id
        });
    });
};

// update a product .
exports.product_update = (req, res) => {
    // 
    if(!req.body.Name || !req.body.Prix || !req.body.Description || !req.body.Poids || !req.body.Image) {
        return res.status(400).send({
            success: false,
            message: "Entrer un produit svp "
        });
    }

    // find product and update
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Product not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating product with id " + req.params.id
        });
    });
};
module.exports.showProduit = async (req, res) => {
    try {
        const produits = await Product.findById(req.params.id);
        res.status(200).json(produits)
    }
    catch (err) {
        res.status(500).json(`message : ${err}`)
    }
}


// delete a product with the specified id.
module.exports.product_delete = (req, res)=> {
    Product.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Product successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Product not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete product with id " + req.params.id
        });
    });
};