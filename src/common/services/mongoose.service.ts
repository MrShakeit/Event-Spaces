import debug from "debug";
import { MongoClient } from "mongodb";

const log: debug.IDebugger = debug("app:mongoose-service");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};
const uri = process.env.MONGO_URL!;

console.log(uri);

const client = new MongoClient(uri, options);
const dbname = "api-db";

class MongooseService {
  private count = 0;

  constructor() {
    this.connectWithRetry();
  }

  getDatabases() {
    return client.db(dbname);
  }

  connectWithRetry = () => {
    log("Attempting MongoDB connection (will retry if needed)");
    client
      .connect()
      .then(() => {
        log("MongoDB is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.log("error", err);
        log(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}
export default new MongooseService();
