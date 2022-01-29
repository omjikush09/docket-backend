import express from 'express';
import Mongoose from "mongoose"
// import { session } from 'passport';
import session, { Store } from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
// import authRoutes form "/router"
import authRoutes from './routes/auth';
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));


require("./config/passport");




app.use(session({
  secret:"Our little secret",
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:1000 *60 *60*24  //1 day in milisecond
  },
  store:MongoStore.create({
    mongoUrl:"mongodb://localhost:27017/docket",
    collectionName:"sessions"
  })
}))

app.use(passport.initialize())
app.use(passport.session());

app.use("/api",authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Connect Database
const DATABASE:string="mongodb://localhost:27017/docket"
Mongoose.connect(DATABASE, 
  ).then(() => {
        console.log("DB CONNECTED")
    }).catch((err) => {
        console.error('Error connecting to Mongo', err);
    });




app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});