fetch('/api/products/all')
  .then(response => response.json())
  .then(productList => {
    let productListHtml = `
    <div class="data-row-product">
        <div>Product Name</div>
        <div>Product Model</div>
        <div>Manufacturer</div>
        <div>Price</div>
        <div>Stock on Hand</div>
        <div>Feature ID</div>
        <div></div>
        <div></div>
    </div>
    `;

    for (let product of productList) {
      productListHtml += `
            <div class="data-row-product">
                <div>${product.product_name}</div>
                <div>${product.product_model}</div>
                <div>${product.manufacturer}</div>
                <div>${product.price}</div>
                <div>${product.stock_on_hand}</div>
                <div>${product.feature_id}</div>
                <a href="/edit_product.html?product_id=${product.product_id}">Edit</a>
                <a href="/delete_product.html?product_id=${product.product_id}">Delete</a>
            </div>
        `;
    }

    document.getElementById('product-list').innerHTML = productListHtml;
  });
