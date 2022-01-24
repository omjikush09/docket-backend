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
        trim: true
    },
    encry_passward: {
        type: String,
    },
    upcomingEvent: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "event"
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Model", userSechma);
