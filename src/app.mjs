import dotenv from 'dotenv';
import DatabaseClient from './api/database/database.client.mjs';
import server from './api/server.mjs';
import path from 'path'

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

const ServerInitPromise = new Promise((resolve, reject) => {
    
    DatabaseClient.connect(uri)
    .catch(err => {
        reject(err)
    })
    .then(() => {
        resolve(server.listen(port, () => console.log('Listening on port ' + port)))
    })
})

const ServerClosePromise = new Promise((resolve, reject) => {

    DatabaseClient.disconnect().catch(err => reject(err))
})

    
export default { ServerInitPromise, ServerClosePromise }