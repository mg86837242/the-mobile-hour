import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUserById,
} from '../models/users.js';

const usersController = express.Router();

// Viewer User
usersController.get('/all', (request, response) => {
  getAllUsers()
    .then(([results]) => {
      response.status(200).json(results);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

// Create User
usersController.post('/create', (request, response) => {
  let user = request.body;

  if (!validator.isAlpha(user.firstname)) {
    response.status(400).json('invalid firstname');
    return;
  }
  if (!validator.isAlpha(user.lastname)) {
    response.status(400).json('invalid lastname');
    return;
  }
  // check if the string contains only letters and numbers (a-zA-Z0-9).
  if (!validator.isAlphanumeric(user.username)) {
    response.status(400).json('invalid username');
    return;
  }

  // encrypt the password
  let encrypted_password = bcrypt.hashSync(user.password, 6);

  createUser(
    // the escape() function is deprecated, but is used here for some reasons
    validator.escape(user.firstname),
    validator.escape(user.lastname),
    validator.escape(user.role),
    validator.escape(user.username),
    encrypted_password,
  )
    .then(([results]) => {
      response.status(200).json('user created with id ' + results.insertId);
    })
    .catch(error => {
      response.status(500).json('failed to create user');
      console.log(error);
    });
});

// Update User
usersController.post('/update', (request, response) => {
  let user = request.body;

  if (!validator.isAlpha(user.firstname)) {
    response.status(400).json('invalid firstname');
    return;
  }
  if (!validator.isAlpha(user.lastname)) {
    response.status(400).json('invalid lastname');
    return;
  }
  // check if the string contains only letters and numbers (a-zA-Z0-9).
  if (!validator.isAlphanumeric(user.username)) {
    response.status(400).json('invalid username');
    return;
  }

  // if the password is not encrypted, encrypt it
  let encrypted_password = user.password;
  if (!user.password.startsWith('$')) {
    // "!" means not startWith
    encrypted_password = bcrypt.hashSync(user.password, 6);
  }

  updateUserById(
    user.user_id,
    validator.escape(user.firstname),
    validator.escape(user.lastname),
    validator.escape(user.role),
    validator.escape(user.username),
    encrypted_password,
  )
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('user updated');
      } else {
        response.status(404).json('user not found');
      }
    })
    .catch(error => {
      console.log('Failed to update user - ' + error);
      response.status(500).json('failed to update user');
    });
});

// Delete User
usersController.post('/delete', (request, response) => {
  let user_id = request.body.user_id;

  deleteUserById(user_id)
    .then(([results]) => {
      if (results.affectedRows > 0) {
        response.status(200).json('user deleted');
      } else {
        response.status(404).json('user not found');
      }
    })
    .catch(error => {
      console.log('Failed to delete user - ' + error);
      response.status(500).json('failed to delete user');
    });
});

// Route handlers for login (incl. bcrypt authentication), status (user role) and logout
usersController.post('/login', (request, response) => {
  // expect some user login details in the format of: {username: "", password: ""}
  let login_details = request.body;

  // get the user from the database by their username and try to verify if their password matches.
  getUserByUsername(login_details.username)
    .then(([results]) => {
      // check if any user exists with that username
      if (results.length > 0) {
        // get the first matching user
        let user = results[0];

        // check if the password matches the one in the database
        if (bcrypt.compareSync(login_details.password, user.password)) {
          // setup the session to login the user; this will allow us to remember their ID and role and use it in other API endpoints
          request.session.user = {
            user_id: user.user_id,
            role: user.role,
          };

          //send back a success message
          response.status(200).json('login successful');
        } else {
          response.status(400).json('login unsuccessful');
        }
      } else {
        response.status(404).json('user not found');
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json('login error');
    });
});

usersController.get('/status', (request, response) => {
  if (request.session.user != null) {
    response.status(200).json({
      role: request.session.user.role,
    });
  } else {
    response.status(200).json({
      role: 'Unauthorised',
    });
  }
});

usersController.post('/logout', (request, response) => {
  request.session.destroy();
  response.status(200).json('logged out');
});

// The following route handler MUST be put after the route handler for "/status", o/w "/status" route will not work properly
usersController.get('/:id', (request, response) => {
  getUserById(request.params.id)
    .then(([results]) => {
      if (results.length > 0) {
        response.status(200).json(results[0]);
      } else {
        response.status(404).json('user not found');
      }
    })
    .catch(error => {
      console.log('failed to get user by id - ' + error);
      response.status(500).json('failed to get user by id');
    });
});

// Export fallback with export default: Usually you will use this syntax if only one value is being exported from a file. It is also used to create a fallback value for a file or module.
export default usersController;
