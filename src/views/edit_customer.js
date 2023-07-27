// get the customer id from the query string (url) edit_customer.html?customer_id=?
let customer_id = new URLSearchParams(window.location.search).get('customer_id');

// if there's a customer id in the query string we will load that customer from the API
if (customer_id) {
  fetch(`/api/customers/${customer_id}`)
    .then(response => response.json())
    .then(customer => {
      // load the customer data into the form
      document.getElementById('customer-id').value = customer.customer_id;
      document.getElementById('customer-firstname').value = customer.firstname;
      document.getElementById('customer-lastname').value = customer.lastname;
      document.getElementById('customer-phone').value = customer.phone;
      document.getElementById('customer-email').value = customer.email;
      document.getElementById('customer-street').value = customer.street;
      document.getElementById('customer-postcode').value = customer.postcode;
      document.getElementById('customer-city').value = customer.city;
      document.getElementById('customer-state').value = customer.state;
    });
}

// Send the updated customer data back to the API on form submit
let editCustomerForm = document.getElementById('edit-customer-form');

editCustomerForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(editCustomerForm)));

  fetch('/api/customers/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(responseJSON => {
      alert(responseJSON);
      window.location.href = 'list_customers.html';
    })
    .catch(error => {
      alert('Failed to update customer: ' + error);
    });
});
