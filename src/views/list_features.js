fetch('/api/features/all')
  .then(response => response.json())
  .then(featureList => {
    let featureListHtml = `
    <div class="data-row-feature">
        <div>Weight</div>
        <div>Dimensions</div>
        <div>Screensize</div>
        <div>Resolution</div>
        <div>CPU</div>
        <div>RAM</div>
        <div>Storage</div>
        <div>Battery</div>
        <div>Rear Camera</div>
        <div>Front Camera</div>
        <div></div>
        <div></div>
    </div>
    `;

    for (let feature of featureList) {
      featureListHtml += `
            <div class="data-row-feature">
                <div>${feature.weight}</div>
                <div>${feature.dimensions}</div>
                <div>${feature.screensize}</div>
                <div>${feature.resolution}</div>
                <div>${feature.CPU}</div>
                <div>${feature.RAM}</div>
                <div>${feature.storage}</div>
                <div>${feature.battery}</div>
                <div>${feature.rear_camera}</div>
                <div>${feature.front_camera}</div>
                <a href="/edit_feature.html?feature_id=${feature.feature_id}">Edit</a>
                <a href="/delete_feature.html?feature_id=${feature.feature_id}">Delete</a>
            </div>
        `;
    }

    document.getElementById('feature-list').innerHTML = featureListHtml;
  });
