"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { session } from 'passport';
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// import authRoutes form "/router"
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
require("./config/passport");
app.use((0, express_session_1.default)({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1 day in milisecond
    },
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb://localhost:27017/docket",
        collectionName: "sessions"
    })
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api", auth_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Connect Database
const DATABASE = "mongodb://localhost:27017/docket";
mongoose_1.default.connect(DATABASE).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.error('Error connecting to Mongo', err);
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
