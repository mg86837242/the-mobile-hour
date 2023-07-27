// get the feature id from the query string (url) delete_feature.html?feature_id=?
let feature_id = new URLSearchParams(window.location.search).get('feature_id');

// if there's a feature id in the query string we will load that feature from the API
if (feature_id) {
  fetch(`/api/features/view/${feature_id}`)
    .then(response => response.json())
    .then(feature => {
      document.getElementById('feature-details').innerHTML = `
                <p>Feature ID: ${feature.feature_id}</p>
                <p>Weight: ${feature.weight}</p>
                <p>Dimensions: ${feature.dimensions}</p>
                <p>Screensize: ${feature.screensize}</p>
                <p>Resolution: ${feature.resolution}</p>
                <p>CPU: ${feature.CPU}</p>
                <p>RAM: ${feature.RAM}</p>
                <p>Storage: ${feature.storage}</p>
                <p>Battery: ${feature.battery}</p>
                <p>Rear Camera: ${feature.rear_camera}</p>
                <p>Front Camera: ${feature.front_camera}</p>
            `;
    });
}

// Handle delete button and redirect
let deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
  let feature = { feature_id: feature_id };

  fetch('/api/features/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feature),
  })
    .then(response => response.json())
    .then(response => {
      alert(response);
      window.location.href = '/list_features.html';
    })
    .catch(error => {
      alert('failed to delete feature - ' + error);
    });
});
