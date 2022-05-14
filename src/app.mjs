import dotenv from 'dotenv';
import DatabaseClient from './api/database/database.client.mjs';
import server from './api/server.mjs';

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

let ServerPromise

export default ServerPromise = new Promise((resolve, reject) => {
    
    DatabaseClient.connect(uri)
    .catch(err => {
        reject(err)
    })
    .then(() => {
        resolve(server.listen(port, () => console.log('Listening on port ' + port)))
    })
})

    
