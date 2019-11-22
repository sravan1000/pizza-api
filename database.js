let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME

const cstring = 'mongodb+srv://sravan:sravanSecret%21%40%23@sravanchowdapu-mvnhs.mongodb.net/pizza?retryWrites=true&w=majority';
class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
    //  mongoose.connect(`mongodb://${server}/${database}`)
     mongoose.connect(`${cstring}`,{useNewUrlParser: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()