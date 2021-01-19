import express from "express";
import { config } from "../config";
import mongoose from "mongoose";

// loaders
import apolloLoader from "./apollo";
import expressLoader from "./express";
import mongooseLoader from "./mongo";

class App {

    app: express.Application;
    constructor() {
        this.app = express();
        this.config();
    }

    private async loader(){
        // Load everything related to express
        await expressLoader(this.app);
        // Connect to mongoose
        await mongooseLoader();
        // load apollo server config
        return apolloLoader();
    }

    async config(){
        const server = await this.loader()
        server.applyMiddleware({
            app: this.app,
            path: config.graphqlPath,
            // Health check on /.well-known/apollo/server-health
            onHealthCheck: async () => {
                if (mongoose.connection.readyState === 1) return;
                throw new Error();
            },
        })

    }
}

export default new App().app
