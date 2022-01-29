"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.validPassword = exports.genPassword = void 0;
const user_1 = __importDefault(require("../models/user"));
const crypto_1 = __importDefault(require("crypto"));
const genPassword = (password) => {
    const salt = crypto_1.default.randomBytes(32).toString('hex');
    const genHash = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, genHash };
};
exports.genPassword = genPassword;
const validPassword = (password, hash, salt) => {
    console.log(salt);
    const hashVerify = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};
exports.validPassword = validPassword;
const signup = (req, res) => {
    const saltAndHash = (0, exports.genPassword)(req.body.password);
    const user = new user_1.default({
        email: req.body.email,
        salt: saltAndHash.salt,
        encry_passward: saltAndHash.genHash,
        name: req.body.name
    });
    user.save((err, user) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: err });
        }
        else {
            console.log(user);
            res.json({ message: "Sign Up Successfully" });
        }
    });
};
exports.signup = signup;
