fetch('/api/products/search/oppo')
  .then(response => response.json())
  .then(productList => {
    let productListHTML = ``;

    for (let product of productList) {
      productListHTML += `
            <div class="product-card column">
                <div class="column">
                    <img src="/img/jannis-lucas-msNCux-u3lo-unsplash.jpg" alt="Example Phone">
                    <span>${product.product_name}</span>
                    <span>${product.product_model}</span>
                    <span>$${product.price}</span>
                </div>
                <div class="column">
                    <a href="/view_product.html?product_id=${product.product_id}" class="button-light row">View</a>
                    <a href="/buy_product.html?product_id=${product.product_id}" class="button-dark row">Buy</a>
                </div>
            </div>
        `;
    }

    document.getElementById('product-list').innerHTML = productListHTML;
  });

const searchButton = document.getElementById('search-button');
const searchTermsInput = document.getElementById('search-terms');

searchButton.addEventListener('click', () => {
  fetch('/api/products/search/' + searchTermsInput.value)
    .then(response => response.json())
    .then(productList => {
      let productListHTML = ``;

      for (let product of productList) {
        productListHTML += `
                <div class="product-card column">
                    <div class="column">
                        <img src="/img/jannis-lucas-msNCux-u3lo-unsplash.jpg" alt="Example Phone">
                        <span>${product.product_name}</span>
                        <span>${product.product_model}</span>
                        <span>${product.manufacturer}</span>
                    </div>
                    <div class="column">
                        <a href="/view_product.html?product_id=${product.product_id}" class="button-light">View</a>
                        <a href="/buy_product.html?product_id=${product.product_id}" class="button-dark">Buy</a>
                    </div>
                </div>
            `;
      }

      document.getElementById('product-list').innerHTML = productListHTML;
    });
});
