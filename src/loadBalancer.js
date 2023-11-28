const cluster = require('cluster');
const http = require('http');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

const parallelism = parseInt(process.env.PARALLELISM || '1');
const basePort = parseInt(process.env.BASE_PORT || '4001');

if (cluster.isMaster) {
  for (let i = 0; i < parallelism; i++) {
    const worker = cluster.fork();
    worker.send({ port: basePort + i, workerId: worker.id });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    const newWorker = cluster.fork();
    newWorker.send({ port: worker.process.env.PORT, workerId: newWorker.id });
  });
} else {
  let db = []; 

  process.on('message', ({ port, workerId }) => {
    const server = http.createServer((req, res) => {
      if (req.url.startsWith('/api')) {
        handleApiRequest(req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    server.listen(port, '127.0.0.1', () => {
      console.log(`Worker ${workerId} is listening on port ${port}`);
    });
  });

  const handleApiRequest = (req, res) => {
    const urlParts = req.url.split('/');
    const endpoint = urlParts[2];

    switch (req.method) {
      case 'GET':
        if (endpoint === 'users') {
          handleGetUsers(req, res);
        } else {
          handleGetUser(req, res, urlParts[3]);
        }
        break;
      case 'POST':
        if (endpoint === 'users') {
          handleCreateUser(req, res);
        } else {
          notFound(res);
        }
        break;
      case 'PUT':
        if (endpoint === 'users') {
          handleUpdateUser(req, res, urlParts[3]);
        } else {
          notFound(res);
        }
        break;
      case 'DELETE':
        if (endpoint === 'users') {
          handleDeleteUser(req, res, urlParts[3]);
        } else {
          notFound(res);
        }
        break;
      default:
        notFound(res);
    }
  };

  const handleGetUsers = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
  };

  const handleGetUser = (req, res, userId) => {
    const user = db.find((u) => u.id === userId);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      notFound(res);
    }
  };

  const handleCreateUser = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const user = JSON.parse(body);
        user.id = uuidv4();
        db.push(user);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (error) {
        badRequest(res, 'Invalid JSON');
      }
    });
  };

  const handleUpdateUser = (req, res, userId) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const updatedUser = JSON.parse(body);
        const index = db.findIndex((u) => u.id === userId);

        if (index !== -1) {
          db[index] = { ...db[index], ...updatedUser };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db[index]));
        } else {
          notFound(res);
        }
      } catch (error) {
        badRequest(res, 'Invalid JSON');
      }
    });
  };

  const handleDeleteUser = (req, res, userId) => {
    const index = db.findIndex((u) => u.id === userId);

    if (index !== -1) {
      db.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      notFound(res);
    }
  };

  const badRequest = (res, message) => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: message }));
  };

  const notFound = (res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  };
}
