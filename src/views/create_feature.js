// Handle form submission to create a feature
let createFeatureForm = document.getElementById('create-feature-form');

createFeatureForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createFeatureForm)));

  fetch('/api/features/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(responseJSON => {
      alert(responseJSON.status ?? responseJSON);
      window.location.href = 'list_features.html';
    })
    .catch(error => {
      alert('Failed to create feature: ' + error);
    });
});
