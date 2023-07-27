let dashboardElement = document.getElementById('dashboard-1-menu');
if (dashboardElement) {
  fetch('/api/users/status')
    .then(response => response.json())
    .then(response => {
      if (response.role == 'Admin') {
        dashboardElement.innerHTML = `
                <h3>Manage Products</h3>
                <p><a href="./create_product.html">Create Product</a></p>
                <p><a href="./list_products.html">View Product (List View)</a></p>
                <h3>Manage Features</h3>
                <p><a href="./create_feature.html">Create Feature</a></p>
                <p><a href="./list_features.html">View Feature (List View)</a></p>
                <h3>Manage Orders</h3>
                <p><a href="./list_orders.html">View Order (List View)</a></p>
                <h3>Manage Customers</h3>
                <p><a href="./list_customers.html">View Customer (List View)</a></p>
                <h3>Manage Users</h3>
                <p><a href="./create_user.html">Create User</a></p>
                <p><a href="./list_users.html">View User (List View)</a></p>
                <h3>Logout</h3>
                <p><a href="./logout.html">Logout</a></p>
            `;
        // <h3>Try New Design <em class="fa-solid fa-triangle-exclamation"></em></h3>
        // <p><a href="./acc_dashboard_new.html">Try New Design</a></p>
      } else {
        dashboardElement.innerHTML = `
                <h3>Manage Products</h3>
                <p><a href="./create_product.html">Create Product</a></p>
                <p><a href="./list_products.html">View Product (List View)</a></p>
                <h3>Manage Features</h3>
                <p><a href="./create_feature.html">Create Feature</a></p>
                <p><a href="./list_features.html">View Feature (List View)</a></p>
                <h3>Manage Orders</h3>
                <p><a href="./list_orders.html">View Order (List View)</a></p>
                <h3>Manage Customers</h3>
                <p><a href="./list_customers.html">View Customer (List View)</a></p>
                <h3>Logout</h3>
                <p><a href="./logout.html">Logout</a></p>
            `;
      }
    });
}
