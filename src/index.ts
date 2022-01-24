import express from 'express';
import Mongoose from "mongoose"
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});



// Connect Database
const DATABASE:string=process.env.DATABASE || "mongodb://localhost:27017/user"
Mongoose.connect(DATABASE, 
  ).then(() => {
        console.log("DB CONNECTED")
    }).catch((err) => {
        console.error('Error connecting to Mongo', err);
    });




app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});