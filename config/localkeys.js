const MONGODB_URI = "mongodb://blog:admin@cluster0-shard-00-00.xsyd5.mongodb.net:27017,cluster0-shard-00-01.xsyd5.mongodb.net:27017,cluster0-shard-00-02.xsyd5.mongodb.net:27017/trade?ssl=true&replicaSet=atlas-106no0-shard-0&authSource=admin&retryWrites=true&w=majority";
// Sample MONGODB KEY -> "mongodb+srv://<username>:<password>@cluster0-ncegj.mongodb.net/<dbname>?retryWrites=true&w=majority"
const JWT_SECRET_KEY = "INSERT_A_RANDOM_STRING";
const GOOGLE_CLIENT_ID = "1015223719324361";
const GOOGLE_CLIENT_SECRET = "e95b659b69e65485924f820fb0cf2d0e";

module.exports = {
  MONGODB_URI,
  JWT_SECRET_KEY,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
};