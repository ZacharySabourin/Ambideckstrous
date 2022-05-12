import dotenv from 'dotenv';
import DatabaseClient from './api/database/database.client.mjs';
import server from './api/server.mjs';

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

//Database connects here
DatabaseClient.connect(uri).
catch(err => {
    console.error(err);
    process.exit(1);
});

server.listen(port, () => console.log('Listening on port ' + port));