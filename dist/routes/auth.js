"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/sigup/password", auth_1.signup);
router.post("/sigin/password", passport_1.default.authenticate('local', { failureRedirect: "/api/login-failure", successRedirect: "login-success" }));
//Login failure route
router.get("/login-failure", (req, res) => {
    res.status(401).json({ error: "Email or Password is wrong" });
});
//Login Successful route
router.get("/sigin/login-success", (req, res) => {
    res.status(200).json({ success: "Login  successfull" });
});
exports.default = router;
