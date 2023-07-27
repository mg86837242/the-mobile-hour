// get the product id from the query string (url) delete_product.html?product_id=?
let product_id = new URLSearchParams(window.location.search).get('product_id');

// if there's a product id in the query string we will load that product from the API
if (product_id) {
  fetch(`/api/products/view/${product_id}`)
    .then(response => response.json())
    .then(product => {
      document.getElementById('product-details').innerHTML = `
                <p>Product Name: ${product.product_name}</p>
                <p>Product Model: ${product.product_model}</p>
                <p>Manufacturer: ${product.manufacturer}</p>
                <p>Price: ${product.price}</p>
                <p>Stock on Hand: ${product.stock_on_hand}</p>
                <p>Feature ID: ${product.feature_id}</p>
            `;
    });
}

// Handle delete button and redirect
let deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
  let product = { product_id: product_id };

  fetch('/api/products/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then(response => response.json())
    .then(response => {
      alert(response);
      window.location.href = '/list_products.html';
    })
    .catch(error => {
      alert('failed to delete product - ' + error);
    });
});
