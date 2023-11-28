import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controllers/userControllers';
import * as errors from '../errors';

export const handleUserRoutes = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url === '/api/users' && req.method === 'GET') {
    userController.getUsers(req, res);
  } else if (req.url?.match(/\/api\/users\/[a-zA-Z0-9-]+/) && req.method === 'GET') {
    userController.getUserById(req, res);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    userController.createUser(req, res);
  } else if (req.url?.match(/\/api\/users\/[a-zA-Z0-9-]+/) && req.method === 'PUT') {
    userController.updateUser(req, res);
  } else if (req.url?.match(/\/api\/users\/[a-zA-Z0-9-]+/) && req.method === 'DELETE') {
    userController.deleteUser(req, res);
  } else {
    res.writeHead(errors.notFoundError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.notFoundError.message }));
  }
};
