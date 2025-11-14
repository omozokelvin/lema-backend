"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const config_1 = __importDefault(require("config"));
const dbPath = config_1.default.get('dbPath');
exports.connection = new sqlite3_1.default.Database(dbPath);
