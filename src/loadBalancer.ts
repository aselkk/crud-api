import http from 'http';

const workers: http.Server[] = [];
let currentWorkerIndex = 0;

const createWorker = (port: number): http.Server => {
  return http.createServer((req, res) => {
    const targetWorker = workers[currentWorkerIndex];
    currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;

    req.pipe(
      http.request(
        {
          hostname: '127.0.0.1',
          port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        },
        (workerRes) => {
          res.writeHead(workerRes.statusCode || 500, workerRes.headers);
          workerRes.pipe(res, { end: true });
        }
      )
    );

    req.on('error', (err) => {
      console.error(`Load Balancer Request Error: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    });
  });
};

const startWorker = (worker: http.Server, port: number): void => {
  worker.listen(port, () => {
    console.log(`Worker started and listening on port ${port}`);
  });
};

for (let i = 0; i < parseInt(process.env.WORKERS || '1'); i++) {
  const worker = createWorker(0);
  workers.push(worker);
  startWorker(worker, 4001);
}

const balancer = http.createServer((req, res) => {
  const targetWorker = workers[currentWorkerIndex];
  currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;

  // Forward the request to the selected worker
  req.pipe(
    http.request(
      {
        hostname: '127.0.0.1',
        port: (targetWorker.address() as any).port,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (workerRes) => {
        res.writeHead(workerRes.statusCode || 500, workerRes.headers);
        workerRes.pipe(res, { end: true });
      }
    )
  );

  req.on('error', (err) => {
    console.error(`Load Balancer Request Error: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  });
});

const PORT = process.env.PORT || 4000;

balancer.listen(PORT, () => {
  console.log(`Load Balancer is listening on port ${PORT}`);
});
