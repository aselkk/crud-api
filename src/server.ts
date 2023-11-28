import * as http from 'http';
import { config } from 'dotenv';
import { handleUserRoutes } from './routes/userRoutes';

config();

const server = http.createServer((req, res) => {
  handleUserRoutes(req, res);
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
