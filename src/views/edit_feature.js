// get the feature id from the query string (url) edit_feature.html?feature_id=?
let feature_id = new URLSearchParams(window.location.search).get('feature_id');

// if there's a feature id in the query string we will load that feature from the API
if (feature_id) {
  fetch(`/api/features/view/${feature_id}`)
    .then(response => response.json())
    .then(feature => {
      // load the feature data into the form
      document.getElementById('feature-id').value = feature.feature_id;
      document.getElementById('feature-weight').value = feature.weight;
      document.getElementById('feature-dimensions').value = feature.dimensions;
      document.getElementById('feature-screensize').value = feature.screensize;
      document.getElementById('feature-resolution').value = feature.resolution;
      document.getElementById('feature-CPU').value = feature.CPU;
      document.getElementById('feature-RAM').value = feature.RAM;
      document.getElementById('feature-storage').value = feature.storage;
      document.getElementById('feature-battery').value = feature.battery;
      document.getElementById('feature-rear-camera').value = feature.rear_camera;
      document.getElementById('feature-front-camera').value = feature.front_camera;
    });
}

// Send the updated feature data back to the API on form submit
let editFeatureForm = document.getElementById('edit-feature-form');

editFeatureForm.addEventListener('submit', event => {
  event.preventDefault();

  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(editFeatureForm)));

  fetch('/api/features/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formDataJSON,
  })
    .then(response => response.json())
    .then(responseJSON => {
      alert(responseJSON);
      window.location.href = 'list_features.html';
    })
    .catch(error => {
      alert('Failed to update feature: ' + error);
    });
});
