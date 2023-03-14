# Server-side rendering project

## What is Middleware

Middleware in Node.js refers to functions that can be used to intercept and process HTTP requests and responses. Middleware sits in between the server and the application, allowing you to modify requests and responses, add functionality, and handle errors.

[official doc](https://expressjs.com/en/guide/writing-middleware.html)

## Middleware examples

1. Body Parser: This middleware parses incoming request bodies in a format such as JSON or form data and makes it available on the request object. This can be useful for handling form submissions or API requests.

1. Cookie Parser: This middleware parses incoming cookies and makes them available on the request object. This can be useful for implementing session management or tracking user behavior.

1. Helmet: This middleware adds security headers to the response to help protect against attacks such as cross-site scripting (XSS) and clickjacking.

1. Morgan: This middleware logs HTTP requests and responses, making it easier to debug issues and track usage.

1. Express-Validator: This middleware validates incoming request data, ensuring that it meets certain criteria before processing it.

1. CORS: This middleware adds Cross-Origin Resource Sharing headers t

## Schemas & Models

- Schema defines the structure of a type of data / document - Properties & property types
- Models allow us to communicate with database collections(get,save,delete,etc)
