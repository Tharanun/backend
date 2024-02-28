const createError = require('../middlewares/error')
const productService = require('../services/product-service')
const db = require('../models/prisma')


// Create Product
exports.createProduct = async (req, res, next) =>{
    const {productName, productImg, amountProduct, price, cost, details} = req.body;
    try {
        if(!productName || !productImg || !amountProduct || !price || !cost || !details){
            return createError(400, 'ใส่ข้อมูลให้ครบด้วยครับ')
        }
        await productService.createProduct(
            productName,
            productImg,
            parseInt(amountProduct),
            parseInt(price),
            parseInt(cost),
            details
        )
        res.json({message: "Create Product Success"})
    } catch (err) {
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
      const allProducts = await productService.getProduct();
      res.json(allProducts);
    } catch (err) {
      next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    const productId = parseInt(req.params.productId);
    const updatedProduct = req.body;
    try {
        await productService.updateProduct(productId, updatedProduct);
        res.json({ message: "Update Product Success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const productId = parseInt(req.params.productId);
    try {
        await productService.deleteProduct(productId);
        res.json({ message: "Delete Product Success" });
    } catch (err) {
        next(err);
    }
};
