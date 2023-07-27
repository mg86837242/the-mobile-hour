// get the product id from the query string (url) view_product.html?product_id=?
let product_id = new URLSearchParams(window.location.search).get('product_id');

// if there's a product id in the query string we will load that product from the API
if (product_id) {
  // must use backtick here so that string interpolation can be used
  fetch(`/api/products/view/${product_id}`)
    .then(response => response.json())
    .then(product => {
      document.getElementById('product-pics').innerHTML = `
            <img src="/img/jannis-lucas-msNCux-u3lo-unsplash-medium.jpg" alt="Example phone picture 1" class="product-pic-1">
            <img src="/img/product_perspectives.svg" alt="Example phone perspectives" class="product-pic-perspectives">
        `;

      fetch(`/api/features/view/${product.feature_id}`)
        .then(response => response.json())
        .then(features => {
          document.getElementById('product-desc').innerHTML = `
                <h2 class="product-desc-sec-title">${product.product_name}</h2>
                <div class="product-desc-sec-subtitle">
                    <h3>$${product.price}</h3>
                    <img src="/img/indv-product-review.svg" alt="Example phone product review" class="product-pic-1">
                </div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus soluta est ducimus rem nam qui quis sapiente ratione quo blanditiis amet repudiandae, ea nulla iste quasi cumque tempora laborum ipsam.</p>
                <a href="/buy_product.html?product_id=${product.product_id}" class="button-dark product-desc-buybutton">Buy Now</a>
                <span>Free shipping over $50</span>
                <div class="product-desc-tile">
                    <h4>Product Details</h4>
                    <ul>
                        <li>Product Name: ${product.product_name}</li>
                        <li>Model: ${product.product_model}</li>
                        <li>Manufacturer: ${product.manufacturer}</li>
                        <li>Number in Stock: ${product.stock_on_hand}</li>
                    </ul>
                </div>
                <div class="product-desc-tile">
                    <h4>Features</h4>
                    <ul>
                        <li>Weight: ${features.weight}</li>
                        <li>Dimensions: ${features.dimensions}</li>
                        <li>Screen Size: ${features.screensize}</li>
                        <li>Resolution: ${features.resolution}</li>
                        <li>CPU: ${features.CPU}</li>
                        <li>RAM: ${features.RAM}</li>
                        <li>Storage: ${features.storage}</li>
                        <li>Battery: ${features.battery}</li>
                        <li>Rear Camera: ${features.rear_camera}</li>
                        <li>Front Camera: ${features.front_camera}</li>
                    </ul>
                </div>
                <div class="product-desc-tile">
                    <h4>Shipping</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus soluta est ducimus rem nam qui quis sapiente ratione quo blanditiis amet repudiandae, ea nulla iste quasi cumque tempora laborum ipsam.</p>
                </div>
                <div class="product-desc-tile">
                    <h4>Returns</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus soluta est ducimus rem nam qui quis sapiente ratione quo blanditiis amet repudiandae, ea nulla iste quasi cumque tempora laborum ipsam.</p>
                </div>
            `;
        });
    });
}
