import pool from '../database.js';

// View Feature
export function getAllFeatures() {
  return pool.query('SELECT * FROM features');
}

export function getFeatureById(feature_id) {
  return pool.query('SELECT * FROM features WHERE feature_id = ?', [feature_id]);
}

// Create Feature
export function createFeature(
  weight,
  dimensions,
  screensize,
  resolution,
  CPU,
  RAM,
  storage,
  battery,
  rear_camera,
  front_camera,
) {
  return pool.query(
    'INSERT INTO features (weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera],
  );
}

// Update Feature
export function updateFeatureById(
  feature_id,
  weight,
  dimensions,
  screensize,
  resolution,
  CPU,
  RAM,
  storage,
  battery,
  rear_camera,
  front_camera,
) {
  return pool.query(
    'UPDATE features ' +
      'SET weight = ?, dimensions = ?, screensize = ?, resolution = ?, CPU = ?, RAM = ?, storage = ?, battery = ?, rear_camera = ?, front_camera = ?' +
      'WHERE feature_id = ?',
    [weight, dimensions, screensize, resolution, CPU, RAM, storage, battery, rear_camera, front_camera, feature_id],
  );
}

// Delete Feature
export function deleteFeatureById(feature_id) {
  return pool.query('DELETE FROM features WHERE feature_id = ?', [feature_id]);
}
