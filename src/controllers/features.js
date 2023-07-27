import express from 'express';
import validator from 'validator';
import {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeatureById,
  deleteFeatureById,
} from '../models/features.js';

const featuresController = express.Router();

// View Feature
featuresController.get('/all', (request, response) => {
  getAllFeatures()
    .then(([results]) => {
      response.status(200).json(results);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

featuresController.get('/view/:id', (request, response) => {
  // route is defined as "/view/:id" so that the complete path is "/api/features/view/:id"
  // the complete path is specified this way for "edit_feature"
  getFeatureById(request.params.id)
    .then(([results]) => {
      if (results.length > 0) {
        response.status(200).json(results[0]);
      } else {
        response.status(404).json('features not found');
      }
    })
    .catch(error => {
      console.log('failed to get features by id - ' + error);
      response.status(500).json('failed to get features by id');
    });
});

// Create Feature
featuresController.post('/create', (request, response) => {
  let feature = request.body;

  if (!validator.isAlphanumeric(feature.weight, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid weight');
    return;
  }
  if (!validator.isAlphanumeric(feature.RAM, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid RAM');
    return;
  }
  if (!validator.isAlphanumeric(feature.storage, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid storage');
    return;
  }
  if (!validator.isAlphanumeric(feature.battery, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid storage');
    return;
  }

  createFeature(
    validator.escape(feature.weight),
    validator.escape(feature.dimensions),
    validator.escape(feature.screensize),
    validator.escape(feature.resolution),
    validator.escape(feature.CPU),
    validator.escape(feature.RAM),
    validator.escape(feature.storage),
    validator.escape(feature.battery),
    validator.escape(feature.rear_camera),
    validator.escape(feature.front_camera),
  )
    .then(([results]) => {
      response.status(200).json({ status: 'feature created', feature_id: results.insertId });
    })
    .catch(error => {
      response.status(500).json('failed to create feature');
      console.log(error);
    });
});

// Update Feature
featuresController.post('/update', (request, response) => {
  let feature = request.body;

  if (!validator.isAlphanumeric(feature.weight, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid weight');
    return;
  }
  if (!validator.isAlphanumeric(feature.RAM, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid RAM');
    return;
  }
  if (!validator.isAlphanumeric(feature.storage, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid storage');
    return;
  }
  if (!validator.isAlphanumeric(feature.battery, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid storage');
    return;
  }

  updateFeatureById(
    feature.feature_id,
    validator.escape(feature.weight),
    validator.escape(feature.dimensions),
    validator.escape(feature.screensize),
    validator.escape(feature.resolution),
    validator.escape(feature.CPU),
    validator.escape(feature.RAM),
    validator.escape(feature.storage),
    validator.escape(feature.battery),
    validator.escape(feature.rear_camera),
    validator.escape(feature.front_camera),
  )
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('feature updated');
      } else {
        response.status(404).json('feature not found');
      }
    })
    .catch(error => {
      console.log('Failed to update feature - ' + error);
      response.status(500).json('failed to update feature');
    });
});

// Delete Feature
featuresController.post('/delete', (request, response) => {
  let feature_id = request.body.feature_id;

  deleteFeatureById(feature_id)
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('feature deleted');
      } else {
        response.status(404).json('feature not found');
      }
    })
    .catch(error => {
      console.log('Failed to delete feature - ' + error);
      response.status(500).json('failed to delete feature');
    });
});

// Export fallback with export default: Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.
export default featuresController;
