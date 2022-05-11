import dotenv from 'dotenv';
import server from './api/server';

dotenv.config();

const port: string = process.env.PORT;

//Database connects here

server.listen(port, () => console.log('Listening on port ' + port));