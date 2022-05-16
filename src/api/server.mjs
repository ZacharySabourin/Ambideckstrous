
// @ts-check

import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import cardsRoutes from './middleware/routes/cards.route.mjs'

import Logger from './middleware/log/logger.mjs'
import ErrorHandler from './middleware/error/error.handler.mjs'

const server = express()

server.use(cors())
server.use(json())
server.use(helmet())

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(Logger.logRequest)

server.use('/api/v1/cards', cardsRoutes)

server.use('*', ErrorHandler.badRoute)

server.use(Logger.logError)
server.use(ErrorHandler.internalError)

export default server