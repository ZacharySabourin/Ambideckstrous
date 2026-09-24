import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import cardsRoutes from './routes/cards.route.js';

import Logger from './util/logger.js';
import ErrorHandler from './middleware/error.handler.js';

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Logger.logRequest);

app.use('/api/v1/cards', cardsRoutes);

app.use(ErrorHandler.badRoute);

app.use(Logger.logError);
app.use(ErrorHandler.internalError);

export default app;