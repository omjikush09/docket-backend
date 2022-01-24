"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Connect Database
const DATABASE = process.env.DATABASE || "mongodb://localhost:27017/user";
mongoose_1.default.connect(DATABASE).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.error('Error connecting to Mongo', err);
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
