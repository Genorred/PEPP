"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const getUser_1 = require("../utils/getUser");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    return (0, getUser_1.default)(context);
});
//# sourceMappingURL=CurrentUser.js.map