fetch('/api/customers/all')
  .then(response => response.json())
  .then(customerList => {
    let customerListHtml = `
    <div class="data-row-customer">
        <div>Full Name</div>
        <div>Phone</div>
        <div>Email</div>
        <div>Street</div>
        <div>Postcode</div>
        <div>City</div>
        <div>State</div>
        <div></div>
        <div></div>
    </div>
    `;

    for (let customer of customerList) {
      customerListHtml += `
            <div class="data-row-customer">
                <div>${customer.firstname} ${customer.lastname}</div>
                <div>${customer.phone}</div>
                <div>${customer.email}</div>
                <div>${customer.street}</div>
                <div>${customer.postcode}</div>
                <div>${customer.city}</div>
                <div>${customer.state}</div>
                <a href="/edit_customer.html?customer_id=${customer.customer_id}">Edit</a>
                <a href="/delete_customer.html?customer_id=${customer.customer_id}">Delete</a>
            </div>
        `;
    }

    document.getElementById('customer-list').innerHTML = customerListHtml;
  });
