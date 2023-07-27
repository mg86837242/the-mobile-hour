import express from 'express';
import session from 'express-session';

const app = express();
const port = process.env.PORT || 3000;

// Enable parsing of JSON post body
app.use(express.json());

// Enable session middleware - this gives us a session object that is
// persistent between requests, making our API stateful and overcoming
// the stateless nature of HTTP.
const sess = {
  secret: process.env.SESSION_SECRET || 'secret phrase',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // should be true once deployed online under HTTPS.
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// Redirect web requests to the web root, which is `index.html`
app.get('/', (request, response) => {
  response.status(301).redirect('/index.html');
});

// Custom access control middleware (PS comment out to disable access control)
app.use((request, response, next) => {
  // define accessible routes for each user role
  const routes = {
    Unauthorised: [
      // critical paths:
      '/index.html',
      '/component_header.html',
      '/component_footer.html',
      '/component_footer_min.html',
      '/login',
      '/script.js',
      '/style.css',
      '/img',
      '/fonts',
      // API endpoints:
      '/api/users/login',
      '/api/users/status',
      '/api/products/all',
      '/api/products/search',
      '/api/products/view',
      '/api/features/view', // this one is used in view_product.js
      '/api/customers/create',
      '/api/orders/create',
      // pages:
      '/list_products_customer',
      '/view_product',
      '/buy_product',
    ],
    Staff: [
      // critical paths:
      '/index.html',
      '/component_header_authz.html',
      '/component_footer.html',
      '/component_footer_min.html',
      '/logout',
      '/acc_dashboard',
      '/script.js',
      '/style.css',
      '/img',
      '/fonts',
      // API endpoints;
      '/api/users/logout',
      '/api/users/status',
      '/api/products/all',
      '/api/products/search',
      '/api/products/view',
      '/api/features/view', // this one is used in view_product.js
      '/api/customers/create',
      '/api/orders/create',
      // pages:
      '/list_products_customer',
      '/view_product',
      '/buy_product',
      '/list_customers',
      '/edit_customer',
      '/delete_customer',
      '/create_feature',
      '/list_features',
      '/edit_feature',
      '/delete_feature',
      '/list_orders',
      '/create_product',
      '/list_products',
      '/edit_product',
      '/delete_product',
    ],
    Admin: [
      // critical paths:
      '/index.html',
      '/component_header_authz.html',
      '/component_footer.html',
      '/component_footer_min.html',
      '/logout',
      '/acc_dashboard',
      '/script.js',
      '/style.css',
      '/img',
      '/fonts',
      // API endpoints;
      '/api',
      // pages:
      '/buy_product',
      '/list_customers',
      '/edit_customer',
      '/delete_customer',
      '/create_feature',
      '/list_features',
      '/edit_feature',
      '/delete_feature',
      '/list_orders',
      '/create_product',
      '/view_product',
      '/list_products_customer',
      '/list_products',
      '/edit_product',
      '/delete_product',
      '/create_user',
      '/list_users',
      '/edit_user',
      '/delete_user',
    ],
  };

  // Establish user role. First we assume the user is unauthorised,
  // then we check the session, if the session exists, we get the
  // user's role out of the session and store it for the next step.
  let user_role = 'Unauthorised';
  if (request.session.user != null) {
    user_role = request.session.user.role;
  }

  // Check if the user role has routes defined for it
  if (user_role in routes) {
    const allowed_routes = routes[user_role];

    // Check if the requested url is a defined route for this user role
    if (allowed_routes.some(url => request.originalUrl.startsWith(url))) {
      // Allow the request to go through
      next();
    } else {
      // Stop the request and respond with forbidden
      response.status(403).json('access forbidden');
    }
  } else {
    // Stop the request and respond with not authenticated
    response.status(401).json('client not authenticated');
  }
});

// Serve static assets (HTML, CSS, JS, images, etc.) & views
app.use(express.static('src/static'));
app.use(express.static('src/views'));

// Mount routers with API endpoints at `/api/(.*)s` paths
import usersController from './controllers/users.js';
app.use('/api/users', usersController);
import productsController from './controllers/products.js';
app.use('/api/products', productsController);
import featuresController from './controllers/features.js';
app.use('/api/features', featuresController);
import ordersController from './controllers/orders.js';
app.use('/api/orders', ordersController);
import customersController from './controllers/customers.js';
app.use('/api/customers', customersController);

// Start backend (i,e. start listening for requests)
app.listen(port, () => {
  console.log('Backend started on port: ' + port);
});
