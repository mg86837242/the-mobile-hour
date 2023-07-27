fetch('/api/users/all')
  .then(response => response.json())
  .then(userList => {
    let userListHtml = `
    <div class="data-row-user">
        <div>Full Name</div>
        <div>Role</div>
        <div>Username</div>
        <div></div>
        <div></div>
    </div>
    `;

    for (let user of userList) {
      userListHtml += `
            <div class="data-row-user">
                <div>${user.firstname} ${user.lastname}</div>
                <div>${user.role}</div>
                <div>${user.username}</div>
                <a href="/edit_user.html?user_id=${user.user_id}">Edit</a>
                <a href="/delete_user.html?user_id=${user.user_id}">Delete</a>
            </div>
        `;
    }

    document.getElementById('user-list').innerHTML = userListHtml;
  });
