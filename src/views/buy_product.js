// get the product id from the query string (url) view_product.html?product_id=?
let product_id = new URLSearchParams(window.location.search).get('product_id');

// if there's a product id in the query string we will load that product from the API
if (product_id) {
  fetch(`/api/products/view/${product_id}`)
    .then(response => response.json())
    .then(product => {
      document.getElementById('product-details').innerHTML = `
                <p><b>Product Name: </b>${product.product_name}</p>
                <p><b>Product Model: </b>${product.product_model}</p>
                <p><b>Manufacturer: </b>${product.manufacturer}</p>
                <p><b>Price: </b>$${product.price}</p>
            `;
    });
}

// create a new customer and then a new order
let customerDetailsForm = document.getElementById('customer-details-form');

customerDetailsForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(customerDetailsForm)));

  fetch('/api/customers/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(responseJSON => {
      alert(responseJSON.status ?? responseJSON);
      fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: responseJSON.customer_id,
          product_id: product_id,
        }),
      })
        .then(response => response.json())
        .then(responseJSON => {
          alert(responseJSON.status ?? responseJSON);
          window.location.href = '/index.html';
        })
        .catch(error => {
          alert('Failed to create order: ' + error);
        });
    })
    .catch(error => {
      alert('Failed to create customer: ' + error);
    });
});
