"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = exports.createMetadata = void 0;
const createMetadata_1 = __importDefault(require("./purejs/createMetadata"));
exports.createMetadata = createMetadata_1.default;
const getMetadata_1 = __importDefault(require("./purejs/getMetadata"));
exports.getMetadata = getMetadata_1.default;
