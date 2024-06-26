import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';

export class Server {
    server = express();
    port: number;

    constructor() {
        this.server = express();
        this.port = Number(process.env.PORT) || 3000;
        this.setMiddlewares();
        this.setRoutes();

        this.server.listen(this.port, () => {
            console.log("Server running in port: " + this.port);
        })
    }

    setMiddlewares() {
        this.server.use(express.json({ limit: '1mb' }));
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cors());
    }

    setRoutes() {
        this.server.use(router)
    }
}