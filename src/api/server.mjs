import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import cardsRoutes from './middleware/routes/cards.route.mjs'

import { logError, badRoute } from './middleware/error/errorHandler.mjs';

const server = express();

server.use(cors());
server.use(json());
server.use(helmet());

// server.use((req, res, next) => {
//     console.log('Time: ', Date.now()) 
//     next
// })

server.use('/api/v1/cards', cardsRoutes)

server.use('*', badRoute);

server.use(logError);

export default server;