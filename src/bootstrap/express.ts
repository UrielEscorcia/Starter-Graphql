import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


import { config } from "../config";

export default async (app: express.Application) => {
    // Body parser only needed during POST on the graphQL path
    app.use(config.graphqlPath, bodyParser.json({limit: '50mb'}));

    // Cors configuration
    app.use(cors());

    // Sets various HTTP headers to help protect our app
    app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
    app.use(morgan('dev'))
};
