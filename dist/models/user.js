"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSechma = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    salt: {
        type: String
    },
    encry_passward: {
        type: String,
        trim: true
    },
    upcomingEvent: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "event"
    }
}, { timestamps: true });
// userSechma.plugin(passportLocalMongoose);
exports.default = (0, mongoose_1.model)("User", userSechma);
