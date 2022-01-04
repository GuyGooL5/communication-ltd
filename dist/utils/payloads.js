"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerError = exports.unautherized = exports.notFound = exports.jsonPayload = void 0;
const jsonPayload = (success, payload) => ({ success, [success ? "data" : "error"]: payload });
exports.jsonPayload = jsonPayload;
exports.notFound = (0, exports.jsonPayload)(false, "Page Not Found");
exports.unautherized = (0, exports.jsonPayload)(false, "Unautherized");
exports.internalServerError = (0, exports.jsonPayload)(false, "Internal Server Error");
