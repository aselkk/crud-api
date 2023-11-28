import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as utils from '../utils';
import * as errors from '../errors';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

export const getUsers = (req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (req: IncomingMessage, res: ServerResponse): void => {
  const userId = req.url?.split('/')[3];
  console.log(userId, '12345')

  if (!userId || !utils.isUUID(userId)) {
    res.writeHead(errors.invalidUserIdError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.invalidUserIdError.message }));
    return;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.writeHead(errors.userNotFoundError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.userNotFoundError.message }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUser = (req: IncomingMessage, res: ServerResponse): void => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(errors.missingFieldsError.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: errors.missingFieldsError.message }));
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };

    users.push(newUser);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse): void => {
  const userId = req.url?.split('/')[3];

  if (!userId || !utils.isUUID(userId)) {
    res.writeHead(errors.invalidUserIdError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.invalidUserIdError.message }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(errors.userNotFoundError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.userNotFoundError.message }));
    return;
  }

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age) {
      res.writeHead(errors.missingFieldsError.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: errors.missingFieldsError.message }));
      return;
    }

    users[userIndex] = {
      id: userId,
      username,
      age,
      hobbies: hobbies,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users[userIndex]));
  });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse): void => {
  const userId = req.url?.split('/')[3];

  if (!userId || !utils.isUUID(userId)) {
    res.writeHead(errors.invalidUserIdError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.invalidUserIdError.message }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(errors.userNotFoundError.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errors.userNotFoundError.message }));
    return;
  }

  users.splice(userIndex, 1);

  res.writeHead(204);
  res.end();
};
