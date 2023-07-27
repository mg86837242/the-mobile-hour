// get the product id from the query string (url) edit_product.html?product_id=?
let product_id = new URLSearchParams(window.location.search).get('product_id');

// if there's a product id in the query string we will load that product from the API
if (product_id) {
  fetch(`/api/products/view/${product_id}`)
    .then(response => response.json())
    .then(product => {
      // load the product data into the form
      document.getElementById('product-id').value = product.product_id;
      document.getElementById('product-name').value = product.product_name;
      document.getElementById('product-model').value = product.product_model;
      document.getElementById('product-manufacturer').value = product.manufacturer;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock-on-hand').value = product.stock_on_hand;
    });
}

// Load features list
fetch('/api/features/all')
  .then(response => response.json())
  .then(featureList => {
    let featureListHTML = ``;

    for (let feature of featureList) {
      featureListHTML += `
        <option value = "${feature.feature_id}">
            ${feature.dimensions} - ${feature.screensize} - ${feature.resolution} - ${feature.RAM} - ${feature.storage}
        </option>
        `;
    }

    document.getElementById('feature-list').innerHTML = featureListHTML;
  });

// Send the updated product data back to the API on form submit
let editProductForm = document.getElementById('edit-product-form');

editProductForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(editProductForm)));

  fetch('/api/products/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(responseJSON => {
      alert(responseJSON);
      window.location.href = 'list_products.html';
    })
    .catch(error => {
      alert('Failed to update product: ' + error);
    });
});
