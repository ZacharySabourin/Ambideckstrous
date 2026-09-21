import dotenv from 'dotenv';
import type { Server } from 'http';
import DatabaseClient from './api/database/database.client.js';
import server from './api/server.js';

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGO_URI as string;
let loadedServer: Server;

export const ServerInitPromise = new Promise<Server>((resolve, reject) => {
    DatabaseClient.connect(uri)
        .catch((err) => reject(err))
        .then(() => resolve((loadedServer = server.listen(port, () => console.log('Listening on port ' + port)))));
});

export function closeServer(): void {
    DatabaseClient.disconnect().then(() => {
        loadedServer.close(() => {
            console.log('server closed');
        });
    });
}
