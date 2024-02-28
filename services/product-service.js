const db = require("../models/prisma")

exports.createProduct = (productName, productImg, amountProduct, price, cost, details) =>{
    return db.product.create({
      data : {
        productName,
        productImg,
        amountProduct,
        price,
        cost,
        details
      }
    })
  }

  exports.getProduct = async () => {
    try {
      const allProducts = await db.product.findMany();
      return allProducts;
    } catch (err) {
      throw err;
    }
  };

// Update Product
exports.updateProduct = async (productId, updatedProduct) => {
  try {
    await db.product.update({
      where: { id: productId },
      data: updatedProduct,
    });
  } catch (err) {
    throw err;
  }
};

// Delete Product
exports.deleteProduct = async (productId) => {
  try {
    await db.product.delete({
      where: { id: productId },
    });
  } catch (err) {
    throw err;
  }
};