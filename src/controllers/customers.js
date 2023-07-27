import express from 'express';
import validator from 'validator';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
} from '../models/customers.js';

const customersController = express.Router();

// View Customer
customersController.get('/all', (request, response) => {
  getAllCustomers()
    .then(([results]) => {
      response.status(200).json(results);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

customersController.get('/:id', (request, response) => {
  getCustomerById(request.params.id)
    .then(([results]) => {
      if (results.length > 0) {
        response.status(200).json(results[0]);
      } else {
        response.status(404).json('customer not found');
      }
    })
    .catch(error => {
      console.log('failed to get customer by id - ' + error);
      response.status(500).json('failed to get customer by id');
    });
});

// Create Customer
customersController.post('/create', (request, response) => {
  let customer = request.body;

  if (!validator.isAlpha(customer.firstname)) {
    response.status(400).json('invalid firstname');
    return;
  }
  if (!validator.isAlpha(customer.lastname)) {
    response.status(400).json('invalid lastname');
    return;
  }
  if (!validator.isMobilePhone(customer.phone)) {
    response.status(400).json('invalid phone');
    return;
  }
  if (!validator.isEmail(customer.email)) {
    response.status(400).json('invalid email');
    return;
  }
  if (!validator.isAlphanumeric(customer.street, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid street');
    return;
  }
  if (!validator.isPostalCode(customer.postcode, 'AU')) {
    response.status(400).json('invalid postcode');
    return;
  }
  if (!validator.isAlpha(customer.city, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid city');
    return;
  }
  if (!validator.isAlpha(customer.state)) {
    response.status(400).json('invalid state');
    return;
  }

  createCustomer(
    validator.escape(customer.firstname),
    validator.escape(customer.lastname),
    validator.escape(customer.phone),
    validator.escape(customer.email),
    validator.escape(customer.street),
    validator.escape(customer.postcode),
    validator.escape(customer.city),
    validator.escape(customer.state),
  )
    .then(([results]) => {
      response.status(200).json({ status: 'customer created', customer_id: results.insertId });
    })
    .catch(error => {
      response.status(500).json('failed to create customer');
      console.log(error);
    });
});

// Update Customer
customersController.post('/update', (request, response) => {
  let customer = request.body;

  if (!validator.isAlpha(customer.firstname)) {
    response.status(400).json('invalid firstname');
    return;
  }
  if (!validator.isAlpha(customer.lastname)) {
    response.status(400).json('invalid lastname');
    return;
  }
  if (!validator.isMobilePhone(customer.phone)) {
    response.status(400).json('invalid phone');
    return;
  }
  if (!validator.isEmail(customer.email)) {
    response.status(400).json('invalid email');
    return;
  }
  if (!validator.isAlphanumeric(customer.street, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid street');
    return;
  }
  if (!validator.isPostalCode(customer.postcode, 'AU')) {
    response.status(400).json('invalid postcode');
    return;
  }
  if (!validator.isAlpha(customer.city, 'en-AU', { ignore: ' ' })) {
    response.status(400).json('invalid city');
    return;
  }
  if (!validator.isAlpha(customer.state)) {
    response.status(400).json('invalid state');
    return;
  }

  updateCustomerById(
    customer.customer_id,
    validator.escape(customer.firstname),
    validator.escape(customer.lastname),
    validator.escape(customer.phone),
    validator.escape(customer.email),
    validator.escape(customer.street),
    validator.escape(customer.postcode),
    validator.escape(customer.city),
    validator.escape(customer.state),
  )
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('customer updated');
      } else {
        response.status(404).json('customer not found');
      }
    })
    .catch(error => {
      console.log('Failed to update customer - ' + error);
      response.status(500).json('failed to update customer');
    });
});

// Delete Customer
customersController.post('/delete', (request, response) => {
  let customer_id = request.body.customer_id;

  deleteCustomerById(customer_id)
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('customer deleted');
      } else {
        response.status(404).json('customer not found');
      }
    })
    .catch(error => {
      console.log('Failed to delete customer - ' + error);
      response.status(500).json('failed to delete customer');
    });
});

// Export fallback with export default: Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.
export default customersController;
