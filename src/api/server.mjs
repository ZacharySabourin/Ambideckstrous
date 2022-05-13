import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import cardsRoutes from './middleware/routes/cards.route.mjs'

import badRoute from './middleware/error/errorHandler.mjs'
import Logger from './middleware/log/logger.mjs'

const server = express()

server.use(cors())
server.use(json())
server.use(helmet())

server.use(Logger.logRequest)

server.use('/api/v1/cards', cardsRoutes)

server.use('*', badRoute)

server.use(Logger.logError)

export default server