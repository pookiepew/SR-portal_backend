import mongoose from "mongoose"

import config from "../config.js"

const connect = async () => {
  const dbUser = config.MONGO_USER;
  const dbPW = config.MONGO_PASS;
  const dbIP = config.MONGO_IP;
  const dbName = config.MONGO_DBNAME;

  try {
    await mongoose.connect(`mongodb://${dbUser}:${dbPW}@${dbIP}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected. User: '${dbUser}' @ DB: '${dbName}'`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connect