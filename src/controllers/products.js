import express from 'express';
import validator from 'validator';
import {
  getAllProducts,
  getProductById,
  getProductsBySearch,
  createProduct,
  updateProductById,
  deleteProductById,
} from '../models/products.js';

const productsController = express.Router();

// View Product
productsController.get('/all', (request, response) => {
  getAllProducts()
    .then(([results]) => {
      response.status(200).json(results);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

productsController.get('/view/:id', (request, response) => {
  // route is defined as "/view/:id" so that the complete path is "/api/products/view/:id"
  // the complete path is specified this way for "view_product" (aka individual product page) & "edit_product" & "delete_product"
  getProductById(request.params.id)
    .then(([results]) => {
      if (results.length > 0) {
        response.status(200).json(results[0]);
      } else {
        response.status(404).json('product not found');
      }
    })
    .catch(error => {
      console.log('failed to get product by id - ' + error);
      response.status(500).json('failed to get product by id');
    });
});

productsController.get('/search/:search_term', (request, response) => {
  getProductsBySearch(request.params.search_term)
    .then(([results]) => {
      if (results.length > 0) {
        response.status(200).json(results);
      } else {
        response.status(404).json('no products found');
      }
    })
    .catch(error => {
      console.log('failed to search products ' + error);
      response.status(500).json('failed to search products');
    });
});

// Create Product
productsController.post('/create', (request, response) => {
  let product = request.body;

  if (!validator.isAlphanumeric(product.manufacturer, 'en-AU')) {
    response.status(400).json('invalid manufacturer');
    return;
  }
  if (!validator.isNumeric(product.price)) {
    response.status(400).json('invalid price');
    return;
  }
  if (!validator.isNumeric(product.stock_on_hand)) {
    response.status(400).json('invalid stock amount');
    return;
  }

  createProduct(
    validator.escape(product.product_name),
    validator.escape(product.product_model),
    validator.escape(product.manufacturer),
    validator.escape(product.price),
    validator.escape(product.stock_on_hand),
    validator.escape(product.feature_id),
  )
    .then(([results]) => {
      response.status(200).json({ status: 'product created', product_id: results.insertId });
    })
    .catch(error => {
      response.status(500).json('failed to create product');
      console.log(error);
    });
});

// Update Product
productsController.post('/update', (request, response) => {
  let product = request.body;
  console.log(product);
  if (!validator.isAlphanumeric(product.manufacturer, 'en-AU')) {
    response.status(400).json('invalid manufacturer');
    return;
  }
  if (!validator.isNumeric(product.price)) {
    response.status(400).json('invalid price');
    return;
  }
  if (!validator.isNumeric(product.stock_on_hand)) {
    response.status(400).json('invalid stock amount');
    return;
  }

  updateProductById(
    product.product_id,
    validator.escape(product.product_name),
    validator.escape(product.product_model),
    validator.escape(product.manufacturer),
    validator.escape(product.price),
    validator.escape(product.stock_on_hand),
    validator.escape(product.feature_id),
  )
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('product updated');
      } else {
        response.status(404).json('product not found');
      }
    })
    .catch(error => {
      console.log('Failed to update product - ' + error);
      response.status(500).json('failed to update product');
    });
});

// Delete Product
productsController.post('/delete', (request, response) => {
  let product_id = request.body.product_id;

  deleteProductById(product_id)
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('product deleted');
      } else {
        response.status(404).json('product not found');
      }
    })
    .catch(error => {
      console.log('Failed to delete product - ' + error);
      response.status(500).json('failed to delete product');
    });
});

// Export fallback with export default: Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.
export default productsController;
