import mongoose from "mongoose";

import { config } from "../config";

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export const mongoDBConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Your Mongoose setup goes here
export default async (): Promise<mongoose.Mongoose> => mongoose.connect(config.mongoDB.uri, mongoDBConfig);
