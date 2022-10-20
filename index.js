import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './src/domain/response.js';
import HttpStatus from './src/controller/employe.controller.js';
import employeRoutes from './src/route/employe.route.js';
import logger from './src/util/logger.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/employes', employeRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Employe API, - All Systems Go')));
app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code)
  .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server')));
  app.listen(PORT, () => logger.info(`Server running on:http://localhost:${PORT}`));
// app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));
