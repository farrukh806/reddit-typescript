"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("dotenv-safe/config");
const User_1 = require("./entities/User");
const Post_1 = require("./entities/Post");
const typeorm_1 = require("typeorm");
const Updoot_1 = require("./entities/Updoot");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User_1.User, Post_1.Post, Updoot_1.Updoot],
    synchronize: true,
    logging: true,
    migrations: [path_1.default.join(__dirname, './migrations/*')]
});
exports.default = AppDataSource;
//# sourceMappingURL=typeorm.config.js.map