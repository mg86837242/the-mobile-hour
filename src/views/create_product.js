// Load feature list
fetch('/api/features/all')
  .then(response => response.json())
  .then(featureList => {
    let featureListHTML = ``;

    for (let feature of featureList) {
      featureListHTML += `
        <option value="${feature.feature_id}">
            ${feature.dimensions} - ${feature.screensize} - ${feature.resolution} - ${feature.RAM} - ${feature.storage}
        </option>
        `;
    }

    document.getElementById('feature-list').innerHTML = featureListHTML;
  });

// Handle form submission to create a product
let createProductForm = document.getElementById('create-product-form');

createProductForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createProductForm)));

  fetch('/api/products/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(response => {
      alert(response.status);
      window.location.href = 'list_products.html';
    })
    .catch(error => {
      alert('Failed to create product: ' + error);
    });
});
