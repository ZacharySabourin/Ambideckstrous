import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { appendFile } from 'fs';

import { logError, badRoute } from './middleware/error/errorHandler';

const server = express();

server.use(cors());
server.use(json());
server.use(helmet());

server.use('*', badRoute);

server.use(logError);

export default server;