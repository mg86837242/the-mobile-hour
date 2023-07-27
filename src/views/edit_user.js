// get the user id from the query string (url) edit_user.html?user_id=?
let user_id = new URLSearchParams(window.location.search).get('user_id');

// if there's a user id in the query string we will load that user from the API
if (user_id) {
  fetch(`/api/users/${user_id}`)
    .then(response => response.json())
    .then(user => {
      // load the user data into the form
      document.getElementById('user-id').value = user.user_id;
      document.getElementById('user-firstname').value = user.firstname;
      document.getElementById('user-lastname').value = user.lastname;
      document.getElementById('user-role').value = user.role;
      document.getElementById('user-username').value = user.username;
      document.getElementById('user-password').value = user.password;
    });
}

// Send the updated user data back to the API on form submit
let editUserForm = document.getElementById('edit-user-form');

editUserForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(editUserForm)));

  fetch('/api/users/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(responseJSON => {
      alert(responseJSON);
      window.location.href = 'list_users.html';
    })
    .catch(error => {
      alert('Failed to update user: ' + error);
    });
});
