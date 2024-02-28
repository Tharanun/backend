const express = require("express")
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const productController = require('../controllers/product-controller')
const upload = require('../middlewares/upload')

router.post('/create',upload.single("productImg"),productController.createProduct)
router.get('/productAll', productController.getProduct)

// Update Product
router.put('/update/:productId', productController.updateProduct);

// Delete Product
router.delete('/delete/:productId', productController.deleteProduct);
module.exports = router