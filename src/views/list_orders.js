fetch('/api/orders/all_with_details')
  .then(response => response.json())
  .then(orderList => {
    let orderListHtml = `
    <div class="data-row-order">
        <div>Order ID</div>
        <div>Product Name</div>
        <div>Customer Name</div>
        <div>Customer Phone</div>
        <div>Customer Email</div>
        <div>Order Date</div>
    </div>
    `;

    for (let order of orderList) {
      orderListHtml += `
            <div class="data-row-order">
                <div>${order.order_id}</div>
                <div>${order.product_name}</div>
                <div>${order.firstname} ${order.lastname}</div>
                <div>${order.phone}</div>
                <div>${order.email}</div>
                <div>${order.order_date}</div>
            </div>
        `;
    }

    document.getElementById('order-list').innerHTML = orderListHtml;
  });
