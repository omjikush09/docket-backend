"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../controllers/auth");
// const LocalStrategy = require("passport-local").Strategy;
// const LocalStrategy=  new Strategy.Strategy();
const customFields = {
    usernameField: "email",
    passwordField: "password"
};
// interface User{
//     name:String;
//     email:String;
//     encry_passward:String;
//     upcomingEvent:Types.ObjectId
//     salt:String;
// }
const verifyCallback = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ email: email })
        .then((user) => {
        if (!user) {
            return done(null, false);
        } // null for their is no error and false is  for authentication
        const isValid = (0, auth_1.validPassword)(password, user.encry_passward, user.salt);
        if (isValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch((err) => {
        done(err);
    });
});
const strategy = new passport_local_1.default.Strategy(customFields, verifyCallback);
passport_1.default.use(strategy);
passport_1.default.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.email });
    });
});
passport_1.default.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
