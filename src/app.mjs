
// @ts-check

import dotenv from 'dotenv';
import DatabaseClient from './api/database/database.client.mjs';
import server from './api/server.mjs';

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGO_URI;
let loadedServer

export const ServerInitPromise = new Promise((resolve, reject) => {
    
    DatabaseClient.connect(uri)
    .catch(err => 
        reject(err)
    )
    .then(() => 
        resolve(loadedServer = server.listen(port, () => console.log('Listening on port ' + port)))
    )
})

export function closeServer()
{
    DatabaseClient.disconnect()
    .then((err) => 
        loadedServer.close((err) => {
            console.log('server closed')
    }))
}    