// Insert dynamic role-based "component_header.html"
let headerElement = document.getElementById('header-component');
if (headerElement) {
  fetch('/api/users/status')
    .then(response => response.json())
    .then(response => {
      if (response.role == 'Admin') {
        fetch('/component_header_authz.html')
          .then(response => response.text())
          .then(componentHTML => {
            headerElement.innerHTML = componentHTML;
          });
      } else if (response.role == 'Staff') {
        fetch('/component_header_authz.html')
          .then(response => response.text())
          .then(componentHTML => {
            headerElement.innerHTML = componentHTML;
          });
      } else {
        fetch('/component_header.html')
          .then(response => response.text())
          .then(componentHTML => {
            headerElement.innerHTML = componentHTML;
          });
      }
    });
}

// Toggle navbar function
function toggleNavItems() {
  let navItems = document.getElementsByClassName('nav-menu');

  for (const navItem of navItems) {
    navItem.classList.toggle('nav-shown');
  }

  // ".expand" selector is a must for specifying the "max-height" of expanded nav menu, which is a must for the nav menu expanding transition animation
  document.getElementById('header-component' || 'header-component-authz').classList.toggle('expand');
}

// Insert "component_footer.html"
let footerElement = document.getElementById('footer-component');
if (footerElement) {
  fetch('/component_footer.html')
    .then(response => response.text())
    .then(componentHTML => {
      document.getElementById('footer-component').innerHTML = componentHTML;
    });
}

// Insert "component_footer_min.html"
let footerMinElement = document.getElementById('footer-component-min');
if (footerMinElement) {
  fetch('/component_footer_min.html')
    .then(response => response.text())
    .then(componentHTML => {
      document.getElementById('footer-component-min').innerHTML = componentHTML;
    });
}
