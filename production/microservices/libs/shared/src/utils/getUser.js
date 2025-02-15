"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRequest_1 = require("./getRequest");
const getUser = (context) => JSON.parse((0, getRequest_1.default)(context).headers["user"]);
exports.default = getUser;
//# sourceMappingURL=getUser.js.map